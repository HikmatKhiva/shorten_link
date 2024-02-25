import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Form } from "react-hook-form";
import { linkSchema } from "../../validation";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/use.http";
import { ErrorDisplay } from "../errors/ErrorDisplay";
import { toast } from "react-toastify";
const GenerateUrl = () => {
  const { request } = useHttp();
  const navigate = useNavigate();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(linkSchema),
  });
  const onSubmit: any = handleSubmit(async (data) => {
    const response = await request("links/generate", "POST", data);
    toast.success(response?.message);
    if (response.message === "generate successfully") {
      reset();
      navigate("/");
    }
  });
  return (
    <Form
      control={control}
      onSubmit={onSubmit}
      className="flex flex-col gap-y-2 "
    >
      <div className="flex items-center md:flex-row">
        <label htmlFor="url" className="flex-grow">
          <input
            type="text"
            {...register("url")}
            autoComplete="off"
            placeholder="Enter Url Here"
            className="w-full py-2 px-3 rounded-s outline-none"
            id="url"
          />
        </label>
        <button
          disabled={Boolean(errors.url?.message)}
          className="bg-green-500 py-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-green-500 rounded-e  text-white md:w-[120px] w-full self-end hover:bg-green-600 transition-all duration-300 cursor-pointer"
        >
          Generate
        </button>
      </div>
      <ErrorDisplay error={errors["url"]} />
    </Form>
  );
};
export default GenerateUrl;
