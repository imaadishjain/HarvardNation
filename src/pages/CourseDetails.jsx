import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../Services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../Services/operations/courseDetailsAPI';
import GetAvgRating from "../utils/avgRating"
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Error from "./Error"
import CourseDetailCard from '../components/core/Course/CourseDetailCard';
import RatingStars from "../components/common/RatingStars"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import Markdown from 'react-markdown'

import ConfirmationModal from "../components/common/ConfirmationModal"
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import { formattedDate } from '../utils/dateFormatter';
import { addToCart } from '../slices/cartSlice';
import Footer from "../components/common/Footer"

const CourseDetails = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const {token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile);
    const {courseId}=useParams(); 
    const{loading}=useSelector((state)=>state.profile);  
    
    const[response,setResponse]=useState(null);
    const[confirmationModal,setConfirmationModal]=useState(null);
    const{paymentLoading}=useSelector((state)=>state.course)
    const[avgReviewCount,setAvgReviewCount]=useState(null);

    useEffect(()=>
    {
        async function  fetchCourse()
        {
            try{
                const res=await fetchCourseDetails(courseId);
                console.log("Res",res);
                 if(!res?.success)
                    {
                        throw new Error(res.data.message);
                    }
                 
                    setResponse(res);
                }catch(error)
                {
                    console.log("API Error",error);
                    toast.error("Failed to load course details")
                }
        }
        if(courseId)
            {
       fetchCourse();
            }

    },[courseId])

    const [avgRating,setAvgRating]=useState(0);

    useEffect(()=>
    {
        const calculateAvgRating=GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
        setAvgRating(calculateAvgRating);
    },[response]);

  const[totalNoOfLecture,setTotalLectures]=useState(0);

  useEffect(()=>
   { 
  
      let totalLectures=0;
      
      response?.data?.courseDetails?.courseContent.forEach((sec)=>
    {
        totalLectures+=sec.subSection.length || 0
    })

    setTotalLectures(totalLectures);

   },[response])


   const[isActive,setIsActive]=useState(Array(0));

    const handleActive=(id)=>
        {
            setIsActive(
            isActive.includes(id) ? isActive.filter((e)=>e!=id) : isActive.concat([id])
            )
        }
        if (loading || !response) {
            return (
              <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
              </div>
            )
          }
          if (!response?.success) {
            return <Error />
          }

   console.log("Course Details",response?.data?.courseDetails)
          
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

   console.log("Category Name",response?.data?.courseDetails?.category?.name)
    const handleBuyCourse=()=>
        {
            if(token)
                {
                    buyCourse(token,[courseId],user,navigate,dispatch);
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

        if (paymentLoading) {
            // console.log("payment loading")
            return (
              <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
              </div>
            )
          }

  return (
   <>
      <div className={`relative w-full bg-richblack-800 z-0`}>
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt={`Course ${courseName}`}
                className="aspect-auto w-full "
              />
          </div>
          
       
           
          <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
            <div>
            <div className='text-richblack-50 mb-3'>Home / Learning / <span className='text-yellow-50'>{response?.data?.courseDetails?.category?.name}</span></div>
              <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseName}</p>
            </div>
            <p className={`text-richblack-200`}>{courseDescription}</p>
            <div className="text-md flex flex-wrap items-center gap-2">
               
               <span className="text-yellow-25">{avgReviewCount}</span>
               <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
               <span>{`(${ratingAndReviews.length} reviews)`}</span>
               <span>{`${studentsEnrolled.length} students enrolled`}</span>
            </div>
            <div>
              <p>Created By {`${instructor?.firstName} ${instructor?.lastName}`}</p>
            </div>
            <div className="flex flex-wrap gap-5 text-lg">
              <p className="flex items-center gap-2">
                 {" "}
                <BiInfoCircle/> Created At {formattedDate(createdAt)}
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineGlobeAlt/> English
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">Rs {price}</p>
            <button className='yellowButton'
            onClick={handleBuyCourse}>
              Buy Now
            </button>
            <button className='blackButton' onClick={()=>dispatch(addToCart(response.data?.courseDetails))}>Add to Cart</button>
          </div>
        </div>


        <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
          <CourseDetailCard 
            course={response?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
      <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
         <div className="my-8 border border-richblack-600 p-8">
          <p className="text-3xl font-semibold">What You'll learn</p>
          <div className="mt-5">
            <Markdown>{whatYouWillLearn}</Markdown>
          </div>
         </div>

         <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                  <span>{courseContent.length} Section's</span>
                  <span>{totalNoOfLecture} Total Duration</span>
                  <span>{response?.data?.totalDuration} Total Length</span>
                </div>
                <div>
                  <button className="text-yellow-25" onClick={()=>setIsActive([])}>
                    Collapse all Section
                  </button>
                </div>
              </div>
          </div>

          <div className="py-4">
          {
            courseContent.map((content,index)=>
            {
              return (
                <CourseAccordionBar
                  course={content}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}

                />
              )
            })
          }

          </div>

          <div className="mb-12 py-4">
            <p className="text-[28px] font-semibold">Author</p>
            <div>
            <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
              <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p className="text-richblack-50">{instructor?.additionalDetails?.about}</p>
          </div>
         </div>

        </div>
      </div>
      <Footer/>
      {
        confirmationModal && (
          <ConfirmationModal modalData={confirmationModal}/>
        )
      }

   </>
  )
}

export default CourseDetails