import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullCourseDetails } from '../Services/operations/courseDetailsAPI';
import { setCompletedLecture, setCourseSectionData, setEntireCourseData, setTotalNumberOfLecture } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
const ViewCourse = () => {
    const[reviewModal,setReviewModal]=useState(false);
    const{courseId}=useParams();
    const{token}=useSelector((state)=>state.auth);
    const  dispatch=useDispatch();

    useEffect(()=>
    {
       const setCourseSpecificDetails= async()=>
        {
           const courseData=await getFullCourseDetails(courseId,token);
           dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
           dispatch(setEntireCourseData(courseData.courseDetails))
           dispatch(setCompletedLecture(courseData.completedVideos))
           let lectures=0;
           courseData?.courseDetails?.courseContent?.forEach((sec)=>
             {
                lectures+=sec.subSection.length
             })
             dispatch(setTotalNumberOfLecture(lectures))
        }
        setCourseSpecificDetails();
    },[])


  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/> 
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>
        {
            reviewModal && 
            (<CourseReviewModal setReviewModal={setReviewModal}/>)
        }
    </>
  )
}

export default ViewCourse