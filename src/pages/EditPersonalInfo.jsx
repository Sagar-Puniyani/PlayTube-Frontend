import React, { useEffect } from "react";
import { Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountDetails } from "../store/slice/authSlice.js";
import Input2 from "../components/Input2";

const EditPersonalInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    setValue("fullname", auth?.fullname);
    setValue("username", auth?.username);
    setValue("email", auth?.email);
  }, [auth, setValue]);

  const saveChanges = async(data) => {
    await dispatch(updateAccountDetails(data));
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset({
      fullname: auth?.fullname,
      username: auth?.username,
      email: auth?.email,
    });
  };

  return (
    <div className="w-full text-white flex justify-center items-center mt-5">
      <div className="bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          Personal Information
          <p className="font-light text-xs">
            Update your personal details here.
          </p>
        </h2>
        <form onSubmit={handleSubmit(saveChanges)} className="space-y-4">
          <div className="flex flex-col">
            <Input2
              label="Full Name"
              type="text"
              className="rounded"
              {...register("fullname", {
                required: "Full Name is required",
              })}
            />
            {errors.fullname && (
              <span className="text-sm text-red-500">
                {errors.fullname?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="Username"
              type="text"
              className="rounded"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <span className="text-sm text-red-500">
                {errors.username?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input2
              label="Email"
              type="email"
              className="rounded"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <div onClick={handleReset}>
              <Button className="bg-gray-500 text-white px-4 py-2 rounded">
                Reset
              </Button>
            </div>
            <Button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
