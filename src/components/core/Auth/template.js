import React from 'react'
import frameImage from '../../../assets/Images/frame.png'
import SignupForm from '../Auth/SignupForm'
import LoginForm from '../Auth/LoginForm'
import { FcGoogle } from 'react-icons/fc'

export default function template({title,desc1,desc2,image,formtype,setIsLoggedIn}){
  return (
    <div className='flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0'>

        <div className='w-11/12 max-w-[450px]'>
          <h1
          className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'
          >{title}</h1>
          <p
          className='text-[1.125rem] leading-[1.625rem] mt-4'>
            <span
            className='text-richblack-100'>{desc1}</span>
            <br></br>
            <span
            className='text-blue-100 italic'>{desc2}</span>
          </p>

          {formtype==="signup"?
          (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
          (<LoginForm  setIsLoggedIn={setIsLoggedIn}/>)}

          {/*<div className='flex w-full items-center my-4 gap-x-2'>
            <div className='w-full h-[1px] bg-richblack-700'></div>
            <p 
            className='text-richblack-700 font-medium leading-[1.75rem]'>OR</p>

            <div className='w-full h-[1px] bg-richblack-700' ></div>
          </div>

          <button 
          className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
          border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'
          >
          <FcGoogle/>
          <p 
          className=''
          >Sign Up with Google</p>
          </button>*/}
        </div>
           
           <div className='relative w-11/12 max-w-[450px]'>
            <img src={frameImage}
                alt="Pattern"
                loading='lazy'
                width={558}
                height={504}
            />
               <img src={image}
                alt="Student"
                loading='lazy'
                width={558}
                height={490}
                className='absolute -top-4 right-4'
            />
           </div>
         
        </div>
    
  )
}
