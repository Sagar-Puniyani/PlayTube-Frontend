import React, {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin,getCurrentUser } from "../store/slice/authSlice.js";
import { LoginSkeleton } from "../skeletons";


 const Login = () => {
  const[load,setLoad]=useState(true)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoad(false);
    }, 1000);
  
    return () => clearTimeout(timeoutId);
  }, []);
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const loading=useSelector((state)=>state.auth?.loading);

  const submit = async (data) => {
    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : { username: data.username, password: data.password };
      const response= await dispatch(userLogin(loginData));
      const user= await dispatch(getCurrentUser());
      
      if(response?.payload && user){
        navigate("/")
      }
      
  };
  if(load || loading){
    return <LoginSkeleton/>
  }
  
 
  return (
    <div className='w-full  text-white p-3 flex justify-center items-start sm:mt-8'>
      <div
      id="container"
      className=" flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20"
    >
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-4 p-2 text-sm sm:w-96 w-full"
      >
        <Input
          placeholder="example@gmail.com"
          label="Username/email"
          className="h-8"
          {...register("username", {
            required: "Username or email is required",
          })}
        />
        {errors.username && (
          <div className="text-red-500">{errors.username.message}</div>
        )}

        <Input
          placeholder="1kd074fjw0"
          label="Password:"
          className="h-8"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                "Password must contain at least one letter, one number, and one special character",
            },
          })}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <Button
          type="submit"
          bgColor="bg-red-700"
          className="w-full hover:scale-110 duration-100 ease-in font-medium p-3 text-xl"
        >
          Login
        </Button>
        <div className="flex items-center justify-center">
          <p className="font-medium">Don't have an account?</p>
          <Link
            to={"/signup"}
            className="text-red-600 cursor-pointer hover:opacity-70 ml-2"
          >
            SignUp
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;