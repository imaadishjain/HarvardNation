import React from "react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../../Services/operations/authAPI";

export default function LoginForm({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    dispatch(login(formData.email, formData.password, navigate));
  }
  return (
    <form
      onSubmit={submitHandler}
      className=" flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full ">
        <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          name="email"
          placeholder="Enter Email Address"
          className="bg-richblack-800 rounded-[0.5rem]  text-richblack-5 w-full p-[12px] "
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
          Password<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          name="password"
          placeholder="Enter Your Password"
          className="bg-richblack-800 rounded-[0.5rem]  text-richblack-5 w-full p-[12px] "
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
            Forgot Password
          </p>
        </Link>
      </label>

      <button className="w-full mt-6 bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]">
        Sign In
      </button>
    </form>
  );
}
