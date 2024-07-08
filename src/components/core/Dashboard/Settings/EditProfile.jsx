import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { updateProfile } from '../../../../Services/operations/settingAPI';

const EditProfile = () => {
  const gender=["Male","Female","Not to Declare","Other"];
  const navigate=useNavigate();

   const {user}=useSelector((state)=>state.profile);
   const {token}=useSelector((state)=>state.auth);
   const dispatch=useDispatch();

   const{
    register,
    handleSubmit,
    formState:{errors}

   }=useForm();
   const submitProfileForm=(data)=>
    {
           dispatch(updateProfile(token,data))
    }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>

      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row text-richblack-5">
            <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='firstName' className='label-style '>First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder='Enter Your First Name'
              className='form-style'
              defaultValue={user?.firstName}
              {...register("firstName",{required:true})}
            />
            {
              errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">Enter Your First Name</span>
              )
            }
          </div>



          <div className="flex flex-col gap-2 lg:w-[48%] text-richblack-5">
            <label htmlFor='lastName' className='label-style text-richblack-5'>Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder='Enter Your Last Name'
              className="form-style"
              defaultValue={user?.lastName}
              {...register("lastName",{required:true})}
            />
            {
              errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">Enter Your Last Name</span>
              )
            }
          </div>
        </div>



        <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className='label-style' htmlFor='dateOfBirth'>Date of Birth</label>
            <input
              type="date"
              className='form-style'
              id="dateOfBirth"
              name="dateOfBirth"
              defaultValue={user?.additionalDetails?.dateOfBirth}
          
              {...register("dateOfBirth",{
                required:{
                  value:true,
                  message:"Please Enter Your Date of Birth"
                },
                max:{
                  value:new Date().toISOString().split("T")[0],
                  message:"Date of Birth cannot be of the future"
                }
              })}

            />

            {
              errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">Enter Your Date of Birth</span>
              )
            }
          </div>


          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='gender' className="lable-style">Gender</label>
            <select
            type="text"
             id="gender"
             name="gender"
              className="form-style"
                defaultValue={user?.additionalDetails?.gender}
              {
                ...register("gender",{
                  required:true,

                })
              }
             >

             {
                gender.map((ele,index)=>
                {
                  return  (
                    <option key={index} value={ele}>
                      {ele}
                    </option>
                  )
                })
             }

            </select>
            {
              errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Gender</span>
              )
            }

          </div>
        </div>


        <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='contactNumber' className="lable-style">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
               className="form-style"
               placeholder='Please Enter Your Phone Number'
              defaultValue={user?.additionalDetails?.contactNumber}
              {
                ...register("contactNumber",(
                  {
                    required:{
                      value:true,
                      message:"Please Enter Your Contact Number"
                    },
                    maxLength:{
                      value:12,
                      message:"Please Enter Valid Phone Number"
                    },
                    minLength:{
                      value:10,
                      message:"Please Enter Valid Phone Number"
                    }
                  }
                ))
              }
            />
            {
              errors.contactNumber && (
                 <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Contact Number</span>
              )
            }

          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor='about' className="lable-style">About</label>
            <input
              type="text"
              id="about"
              name="about"
              defaultValue={user?.additionalDetails?.about}
              placeholder='About'
               className="form-style"
              {
                ...register("about",({
                  required:{
                    value:true,
                    message:"Please Tells us about You"
                  }
                }))
              }
            />
            {
              errors.about && (
                <span span className="-mt-1 text-[12px] text-yellow-100">Please Enter your Info</span>
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

        <IconBtn type="submit" text={"save"}/>
      </div>
  
      </form>
    </>
  )
}

export default EditProfile