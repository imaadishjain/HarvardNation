import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconBtn from '../../../common/IconBtn';
import { changePassword } from '../../../../Services/operations/settingAPI';

const UpdatePassword = () => {

  const[showNewPassword,setShowNewPassword]=useState(false);
  const[showOldPassword,setShowOldPassword]=useState(false);

  const{token}=useSelector((state)=>state.auth)

  const dispatch=useDispatch();
  const navigate=useNavigate();


  const{
    handleSubmit,
    register,
    formState:{errors}
  }=useForm();
   const submitPasswordForm=(data)=>
    {
       try{
        dispatch(changePassword(token,data))
       }catch(error)
       {
        console.log("Error in Connecting to backend",error)
       }
    }
  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          
      <div className="flex flex-col gap-5 lg:flex-row">
      <div className="relative flex flex-col gap-2 lg:w-[48%]">
             <label htmlFor='oldPassword' className='label-style'>Current Password</label>
             <input
              type={showOldPassword?"text":"password"}
              name="oldPassword"
              id="oldPassword"
              className='form-style'
              {
                ...register("oldPassword",
                {required:
                {
                  value:true,
                  message:"Please Enter Your Current Password"
                }})
              }
             />
             <span onClick={()=>setShowOldPassword((prev)=>!prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer">
              {
                showOldPassword ?
                (
                  <AiOutlineEye fontSize={25}/>
                )
                :
                (
                  <AiOutlineEyeInvisible fontSize={25}/>
                )
              }
             </span>
             {
              errors.oldPassword &&
              (
                <span className="-mt-1 text-[12px] text-yellow-100">errors.oldPassword.message</span>
              )
             }
            </div>




            <div className="relative flex flex-col gap-2 lg:w-[48%]">
             <label htmlFor='newPassword' className='label-style'>New Password</label>
             <input
              type={showNewPassword?"text":"password"}
              name="newPassword"
              id="newPassword"
              className='form-style'
              {
                ...register("newPassword",
                {required:
                {
                  value:true,
                  message:"Please Enter Your New Password"
                }})
              }
             />
             <span onClick={()=>setShowNewPassword((prev)=>!prev)}
               className="absolute right-3 top-[38px] z-[10] cursor-pointer">
              {
                showNewPassword ?
                (
                  <AiOutlineEye fontSize={25}/>
                )
                :
                (
                  <AiOutlineEyeInvisible fontSize={25}/>
                )
              }
             </span>
             {
              errors.newPassword &&
              (
                <span className="-mt-1 text-[12px] text-yellow-100">errors.newPassword.message</span>
              )
             }
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
           onClick={()=>navigate("/dashboard/my-profile")}
             className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
           
           >
           Cancel

          </button>

          <IconBtn type="submit" text={"Update"}/>
        </div>
      </form>
    </>
  )
}

export default UpdatePassword