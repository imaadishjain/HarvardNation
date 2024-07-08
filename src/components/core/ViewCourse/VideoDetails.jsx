import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react';
import { useEffect } from 'react';
import { markLectureAsCompleted } from '../../../Services/operations/courseDetailsAPI';
import { updateCompletedLecture } from '../../../slices/viewCourseSlice';
import {BigPlayButton, Player } from 'video-react';
import "video-react/dist/video-react.css"
import IconBtn from '../../common/IconBtn';
import toast from 'react-hot-toast';


const VideoDetails = () => {

  const {courseId,sectionId,subSectionId}=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const playerRef=useRef();
  const{token}=useSelector((state)=>state.auth);
  const{courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse);

  const[videoData,setVideoData]=useState([]);
  const[videoEnded,setVideoEnded]=useState(false);
  const[loading,setLoading]=useState(false);
  const[previewSource,setPreviewSource]=useState("");
  const location=useLocation();

  useEffect(()=>
  {
     const setVideoSpecificDetails=async()=>
     {
           if(!courseSectionData?.length)
           {
            return;
           }
           else if(!courseId && !subSectionId && !sectionId)
           {
             navigate("/dashboard/enrolled-courses")
           }
           else
           {
              const filteredData=courseSectionData?.filter((course)=>course._id===sectionId)

              const filteredVideoData=filteredData?.[0]?.subSection?.filter((data)=>data._id===subSectionId)

              setVideoData(filteredVideoData[0]);
              setPreviewSource(courseEntireData.thumbnail)
              setVideoEnded(false);
           }
     }
     setVideoSpecificDetails();
  },[courseSectionData, courseEntireData, location.pathname])
  const isFirstVideo=()=>
  {

    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)

    const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId)
     
    if(currentSectionIndex===0 && currentSubSectionIndex ===0)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  const isLastVideo=()=>
  {
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)

    const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId)
     
       const noOfSubSection=courseSectionData[currentSectionIndex].subSection.length;

       if(currentSectionIndex===courseSectionData.length-1 && currentSubSectionIndex===noOfSubSection-1)
       {
        return true;
       }
       else
       {
        return false;
       }
  }

  const goToNextVideo=()=>
  {
    const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)

    const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId)
     
       const noOfSubSection=courseSectionData[currentSectionIndex].subSection.length;

       if(currentSubSectionIndex!==noOfSubSection-1)
       {
          const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
           
          navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);

       }
       else
       {
         const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
         const nextSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id
         navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
       }
           
  }

  const goToPrevVideo=()=>
  {
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)

    const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection?.findIndex((data)=>data._id===subSectionId)
     
       const noOfSubSection=courseSectionData[currentSectionIndex].subSection.length;

       if(currentSubSectionIndex!==0)
       {
            const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
       }
       else
       {
        const prevSectionId=courseSectionData[currentSectionIndex-1]._id;
        const prevSubSectionLength=courseSectionData[currentSectionIndex-1].subSection.length
        const prevSubSectionId=courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;
        navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
       }
        

  }

  const handleLectureCompletion=async()=>
  {    

    setLoading(true);

    try{
      const res=await markLectureAsCompleted({courseId:courseId,subSectionId:subSectionId},token)
      if(!res?.success)
      {
        throw new Error(res?.data?.message);
      }
      dispatch(updateCompletedLecture(subSectionId));
    }catch(error)
    {
      console.log("Error",error);
    }

    
    setLoading(false);
     
  }



  return (
    <div className="flex flex-col gap-5 text-white">
            {
              !videoData ?
              (
                <img
                src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
                />
              )
              :
              (<Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={()=>setVideoEnded(true)}
              src={videoData?.videoUrl}>

                <BigPlayButton position="center"/>
                {
                  videoEnded && (
                    <div
                   
                     style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                      {
                        !completedLectures?.includes(subSectionId) &&(
                          <IconBtn
                            disabled={loading}
                            onClick={()=>handleLectureCompletion()}
                            text={!loading?"Mark as Completed" :"Loading..."}
                            customClasses="text-xl max-w-max px-4 mx-auto"
                          />
                        )
                      }
                      <IconBtn
                        disabled={loading}
                        onClick={()=>
                        {
                          if(playerRef?.current)
                          {
                            playerRef?.current?.seek(0);
                            setVideoEnded(false);
                          }
                        }}
                      
                        text="Rewatch"
                         customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                      />
                     <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                      {
                        !isFirstVideo() && (
                          <button 
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className='blackButton'>
                            Previous
                          </button>
                        )
                      }
                      {
                        !isLastVideo() && (
                           <button
                           disabled={loading}
                          onClick={goToNextVideo}
                          className='blackButton'>
                            Next
                            </button>
                        )
                      }
                     </div>

                    </div>
                  )
                }

              </Player>)
            }

            <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
            <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails