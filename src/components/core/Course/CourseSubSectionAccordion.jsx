import React, { useEffect } from 'react'
import { HiOutlineVideoCamera } from "react-icons/hi"
import { convertSecToTime } from '../../../utils/dateFormatter'
import { useState } from 'react'

const CourseSubSectionAccordion = ({subSec}) => {
    const [time,setTime]=useState("");

    useEffect(()=>
    {
        setTime(convertSecToTime(subSec.timeDuration));

    },[subSec])
  return (
    <div>
        <div className="flex justify-between py-2">
            <div className={`flex items-center gap-2`}>
            <span className='text-yellow-50'>
            <HiOutlineVideoCamera />
           </span>
            <p>{subSec?.title}</p>
            </div>
            <div>
                {time}
            </div>
        </div>
    </div>
  )
}

export default CourseSubSectionAccordion