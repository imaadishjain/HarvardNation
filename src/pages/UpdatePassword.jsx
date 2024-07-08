import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi"

import { useState } from 'react';
import { resetPassword } from '../Services/operations/authAPI';

import {setLength,setLowerCase,setUpperCase,setNumbers,setSpecial} from "../slices/authSlice.js"
import CheckPassword from '../components/core/Auth/CheckPassword';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const UpdatePassword = () => {

    
     const[formData,setFormData]=useState({
        password:"",
        confirmPassword:""
     })
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setConfirmPassword]=useState(false)
    const {loading}=useSelector((state)=>state.auth)
    const[click,setClick]=useState(false);

    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();
    const{includeLowerCase,includeUpperCase,includeNumbers,includeSpecial,length}=useSelector((state)=>state.auth)

     let hasUppercase;
     let hasLowercase;
     let hasNumeric; 
     let hasSpecial; 
     let haslength;


    function handleOnChange(event) {
       
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
  const handleOnSubmit=(event)=>
    {
      
      event.preventDefault();
         if(!(includeLowerCase && includeUpperCase && includeNumbers && includeSpecial && length))
          {  
            toast.error("Invalid Password");
          }
          else{
          const token=location.pathname.split('/').at(-1);
          dispatch(resetPassword(formData.password,formData.confirmPassword,token,navigate));
          }
    }
    const handleClick=(event)=>
      {
             if(!click)
              {
                setClick(true);
              }

      }

  return ( 
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {
            loading ?
            (<div className='spinner'>
                Loading
            </div>)
            :
            (
                <div  className="max-w-[500px] p-4 lg:p-8">
                    <h1  className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
                    <p
                    className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100"
                    >Almost done .Enter your new password and youre all set.</p>

                    <form onSubmit={handleOnSubmit} >
                         <label className="relative">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                          New Password<sup className="text-pink-200">*</sup>
                          </p>
                          <input 
                          required
                          type={showPassword?"text":"password"}
                          name="password"
                          value={formData.password}
                          onChange={handleOnChange}
                          placeholder=' Enter New Password'
                          className="form-style w-full !pr-10"
                      
                          onClick={()=>handleClick()}
                        
                          />
                         
                          <span onClick={(e)=>setShowPassword((prev)=>!prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                           {
                            showPassword ?
                            <FaEyeSlash fontSize={24}/>
                            :
                            <FaEye fontSize={24} />
                           }
                          </span>
                         </label>
                          

                         <label className="relative mt-3 block">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
                          <input 
                          required
                          type={showConfirmPassword?"text":"password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleOnChange}
                          placeholder=' Confirm Password'
                           className="form-style w-full !pr-10 "
                          />
                         
                          <span onClick={(e)=>setConfirmPassword((prev)=>!prev)}
                           className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                           {
                            showConfirmPassword?
                            <FaEyeSlash fontSize={24}/>
                            :
                            <FaEye fontSize={24} />
                           }
                          </span>
                         </label>
                      

                      {
                        click && 
                        (
                          <div>
                          <CheckPassword/>
                          </div>

                        )

                      }
                     
                    

                    <button type="submit"
                     className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                      Reset  Password
                    </button>

                    </form>

                    <div  className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                            <BiArrowBack />Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword