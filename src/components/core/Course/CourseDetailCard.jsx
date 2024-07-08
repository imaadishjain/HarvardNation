import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from "../../../utils/constants"
import copy from "copy-to-clipboard"
import { addToCart } from '../../../slices/cartSlice';
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const CourseDetailCard = ({course,setConfirmationModal,handleBuyCourse}) => {

  const{user}=useSelector((state)=>state.profile);
  const{token}=useSelector((state)=>state.auth);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const{
    thumbnail,
    price,
    _id
  }=course;

  const handleShare=()=>
    {
        copy(window.location.href);
        toast.success("Course Copied to the Clipboard")
    }
   
    const handleAddToCart=()=>
        {
            if(!user && user.accountType===ACCOUNT_TYPE.INSTRUCTOR)
                {
                    toast.error("Instructor are not allowed to buy a course");
                    return;
                }
            if(token)
                {
                    dispatch(addToCart(course))
                    return;
                }
                setConfirmationModal({
                    text1:"You are not logged in!",
                    text2:"Please Login to purchase course",
                    btn1Text:"Login",
                    btn2Text:"Cancel",
                    btn1Handler:()=>navigate("/login"),
                    btn2Handler:()=>setConfirmationModal(null)
                })


        }
        
        useEffect(()=>
        {
          console.log("Some Important Info",course?.studentsEnrolled.includes(user?._id))
        }
        ,[])




  return (
   <>
    <div  className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
      
      <img
        src={thumbnail}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />
       <div className="px-4">
       <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs {course?.price}
        </div>
        <div className="flex flex-col gap-4">
          <button
           className='yellowButton'
           onClick={
            (user && course?.studentsEnrolled.includes(user?._id))?
            ()=>navigate("/dashboard/enrolled-courses")
            :
            handleBuyCourse
           }>

           {
            (user && course?.studentsEnrolled.includes(user?._id))?
             "Go to Course"
            :
            "Buy Now"
           }
          </button>
          {
            (!user || ! course.studentsEnrolled.includes(user._id)) && 
            (
                <button
                onClick={handleAddToCart}
                className="blackButton">
                    Add to Cart
                </button>
            )
          }
        </div>
        <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30 Day Money Back Guarantee</p>
        </div>

        <div >
            <p className={`my-2 text-xl font-semibold `}>This Course Include</p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                {
                    course?.instruction.map((ins,index)=>
                    {
                        return (
                        <p className="flex gap-2" key={index}>
                        <BsFillCaretRightFill />
                        <span>{ins}</span>
                        </p>
                        )
                    })
                }
            </div>
        </div>

        <div className='text-center'>
        <button
         className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
        onClick={handleShare}>
        <FaShareSquare size={15} /> Share
        </button>

        </div>
      </div>
    </div>
   </>
  )
}

export default CourseDetailCard