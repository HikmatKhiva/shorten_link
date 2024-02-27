import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/app";
import { login } from "../../store/slice/userSlice";
import { auth } from "../../api/auth";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [inputPasswordType, setInputPasswordType] =
    useState<InputPassword>("password");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const user = await auth("auth/login", data);
    setLoading(false);
    if (user?.status === 500)
      return toast.error("server shut down please try later");
    if (typeof user == "string") return toast.info(user);
    dispatch(login(user));
    toast.success("User Login Successfully");
    reset();
    navigate("/");
  });
  const handleClickPasswordType = () =>
    setInputPasswordType((prev) => (prev == "text" ? "password" : "text"));
  return (
    <div className="text-center">
      <h2 className="mb-2 text-xl text-gray-950 text-center">LoginPage</h2>
      <form
        method="post"
        onSubmit={onSubmit}
        className="md:max-w-[420px] max-w-72 w-[400px] rounded bg-primary-blue p-5 pt-10 flex flex-col gap-y-3"
      >
        <div className="text-start">
          <label htmlFor="email" className="relative w-full">
            <input
              type="email"
              autoComplete="email"
              id="email"
              {...register("email")}
              className="w-full py-2 outline-none rounded px-2 placeholder:text-gray-900 text-gray-900"
              placeholder="Enter Your Email"
            />
          </label>
          <ErrorDisplay message={errors["email"]?.message?.toString()} />
        </div>
        <div className="text-start">
          <label htmlFor="password" className="relative w-full">
            <input
              type={inputPasswordType}
              {...register("password")}
              placeholder="Enter Your Password"
              className="w-full py-2 outline-none rounded px-2 placeholder:text-gray-900 text-gray-900"
              id="password"
            />
            <button
              type="button"
              name="password-type"
              onClick={handleClickPasswordType}
              className="absolute right-1 top-1/2  -translate-y-1/2 "
            >
              {inputPasswordType === "text" ? (
                <IoMdEye size={20} />
              ) : (
                <IoMdEyeOff size={20} />
              )}
            </button>
          </label>
          <ErrorDisplay message={errors["password"]?.message?.toString()} />
        </div>
        <button
          disabled={
            loading ||
            Boolean(errors.email?.message) ||
            Boolean(errors.password?.message)
          }
          name="submit"
          type="submit"
          className="bg-green-500 py-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-green-500 rounded text-white w-[120px] self-end hover:bg-green-600 transition-all duration-300 cursor-pointer"
        >
          Login
        </button>
        <p className="text-white">
          if you haven't account{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
