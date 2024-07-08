import React from "react";
import { useState } from "react";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";

import { sendOtp, signup } from "../../../Services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import CheckPassword from "./CheckPassword";
import {setLength,setLowerCase,setUpperCase,setNumbers,setSpecial} from "../../../slices/authSlice"

export default function SignupForm({ setIsLoggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const[click,setClick]=useState(false);


  const{includeLowerCase,includeUpperCase,includeNumbers,includeSpecial,length}=useSelector((state)=>state.auth)

  let hasUppercase;
  let hasLowercase;
  let hasNumeric; 
  let hasSpecial; 
  let haslength;





  function changeHandler(event) {

    if(event.target.name=="password")
      {
    const password=event.target.value;
    const chars = Array.from(password);

  hasUppercase = chars.some(char => /[A-Z]/.test(char));
  hasLowercase = chars.some(char => /[a-z]/.test(char));
  hasNumeric = chars.some(char => !isNaN(char) && char !== ' ');
  hasSpecial = chars.some(char => /[!@#$%^&*(),.?":{}|<>]/.test(char));
  haslength=(password.length>=8)?true:false
    dispatch(setLowerCase(hasLowercase));
    dispatch(setUpperCase(hasUppercase));
    dispatch(setNumbers(hasNumeric));
    dispatch(setSpecial(hasSpecial));

    dispatch(setLength(haslength));
      } 


    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    if(!(includeLowerCase && includeUpperCase && includeNumbers && includeSpecial && length))
      {  
        toast.error("Invalid Password");
        return
      }
      dispatch(setLowerCase(false));
      dispatch(setUpperCase(false));
      dispatch(setNumbers(false));
      dispatch(setSpecial(false));
      dispatch(setLength(false));
      setClick(false)
    if (formData.password != formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }


    const FinalData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(FinalData));

    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType("Student");
  }
   
  const handleClick=(event)=>
    {
           if(!click)
            {
              setClick(true);
            }

    }


  return (
    <div>
      <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
        <button
          className={`${
            accountType === "Student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("Student")}
        >
          Student
        </button>
        <button
          className={`${
            accountType === "Instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("Instructor")}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="w-full flex gap-x-4 mt-[20px]">
          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              First Name<sub className="text-pink-200">*</sub>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              value={formData.firstName}
              placeholder="Enter Your First Name"
              className="bg-richblack-800 rounded-[0.5rem]  text-richblack-5 w-full p-[12px] "
            />
          </label>

          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Last Name<sub className="text-pink-200">*</sub>
            </p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              value={formData.lastName}
              placeholder="Enter Your Last Name"
              className="bg-richblack-800 rounded-[0.5rem]  text-richblack-5 w-full p-[12px] "
            />
          </label>
        </div>

        <div className="w-full mt-[20px]">
          <label className="w-full  mt-[20px]">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Email Address
              <sub className="text-pink-200">*</sub>
            </p>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
              placeholder="Enter Email Address"
              className="bg-richblack-800 rounded-[0.5rem]  text-richblack-5 w-full p-[12px] "
            />
          </label>
        </div>

        <div className="flex gap-x-4  mt-[20px]">
          <label className=" w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Create Password
              <sub className="text-pink-200">*</sub>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              value={formData.password}
              placeholder="Enter Password"
              className="bg-richblack-800 rounded-[0.5rem]  text-richblack-5 w-full p-[12px] "
              onClick={()=>handleClick()}
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
          </label>

          <label className=" w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Confirm Password
              <sub className="text-pink-200">*</sub>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="bg-richblack-800 rounded-[0.5rem]  text-richblack-5 w-full p-[12px] "
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        {
                        click && 
                        (
                          <div>
                          <CheckPassword/>
                          </div>

                        )

        }

        <button className="w-full mt-6 bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]">
          Create Account
        </button>
      </form>
    </div>
  );
}
