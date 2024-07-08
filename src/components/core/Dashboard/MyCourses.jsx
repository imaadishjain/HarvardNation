import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../Services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { useEffect } from 'react';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {
    const {token}=useSelector((state)=>state.auth);

    const navigate=useNavigate();

    const[courses,setCourses]=useState([]);

    useEffect(()=>
    {
        const fetchCourses=async()=>
            {
                const result=await fetchInstructorCourses(token);
                if(result)
                    {
                        setCourses(result);

                    }
            }
            fetchCourses();
    },[])
  return (
    <div>
      
      <div className="mb-14 flex items-center justify-between">
      <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
            text="Add Course"
            onClick={()=>navigate("/dashboard/add-course")}
        />
      </div>
      {
        courses && <CoursesTable courses={courses} setCourses={setCourses}/>
      }


    </div>
  )
}

export default MyCourses