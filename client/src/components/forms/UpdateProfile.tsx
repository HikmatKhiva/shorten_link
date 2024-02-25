import { useForm, Form } from "react-hook-form";
import { useHttp } from "../../hooks/use.http";
import { ErrorDisplay } from "../errors/ErrorDisplay";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchema } from "../../validation";
import { useAppSelector } from "../../hooks/app";
const UpdateProfile = () => {
  const { request } = useHttp();
  const { user } = useAppSelector((state) => state.user);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
  });
  const onSubmit: any = handleSubmit(async (data) => {
    await request(`auth/update/${user?.userId}`, "POST", data);
  });

  return (
    <Form
      control={control}
      onSubmit={onSubmit}
      method="post"
      className="pt-5 px-2 flex flex-col gap-3"
    >
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          defaultValue={user?.name ? user?.name : ""}
          {...register("name")}
          autoComplete="off"
          className="w-full py-1 px-2 outline-none border border-primary-blue/50 focus:border-primary-blue/90 rounded"
          placeholder="Enter Your Name"
        />
      </label>
      <ErrorDisplay error={errors["name"]} />
      <button
        type="submit"
        className="bg-green-500 py-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-green-500 rounded text-white w-[120px] self-end hover:bg-green-600 transition-all duration-300 cursor-pointer"
      >
        Update
      </button>
    </Form>
  );
};

export default UpdateProfile;
