import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/app";
import { login } from "../../store/slice/userSlice";
import { auth } from "../../api/auth";
const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputPasswordType, setInputPasswordType] =
    useState<InputPassword>("password");
  const [loading, setLoading] = useState<boolean>(false);
  const handleClickPasswordType = () =>
    setInputPasswordType((prev) => (prev == "text" ? "password" : "text"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const user = await auth("auth/register", data);
    setLoading(false);
    if (user?.status === 500)
      return toast.error("server shut down please try later");
    if (typeof user == "string") return toast.info(user);
    if (user.name === "error") return toast.info(user.detail);
    toast.success("user register successfully");
    dispatch(login(user));
    navigate("/");
  });
  return (
    <div className="text-center">
      <h2 className="mb-2 text-xl text-gray-950">Register</h2>
      <form
        onSubmit={onSubmit}
        className="md:max-w-[420px] max-w-72 w-[400px] rounded bg-primary-blue p-5 pt-10 flex flex-col gap-y-3"
      >
        <div className="text-start">
          <label htmlFor="name" className="relative w-full">
            <input
              type="text"
              autoComplete="off"
              {...register("name")}
              id="name"
              className="w-full py-2 outline-none rounded px-2 placeholder:text-gray-900 text-gray-900"
              placeholder="Enter Your Name"
            />
          </label>
          <ErrorDisplay message={errors["name"]?.message?.toString()} />
        </div>
        <div className="text-start">
          <label htmlFor="email" className="relative w-full">
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              id="email"
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
          type="submit"
          disabled={
            loading ||
            Boolean(errors.name?.message) ||
            Boolean(errors.email?.message) ||
            Boolean(errors.password?.message)
          }
          className="bg-green-500 py-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-green-500 rounded text-white w-[120px] self-end hover:bg-green-600 transition-all duration-300 cursor-pointer"
        >
          Register
        </button>
        <p className="text-white">
          if you have account{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default RegisterPage;
