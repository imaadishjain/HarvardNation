import React from 'react'
import { useState } from 'react';
import {HomePageExplore} from "../../../data/homepage-explore.js"
import HighlightText from '../HomePage/HighlightText.jsx';
import CourseCard from './CourseCard.jsx';
import { logDOM } from '@testing-library/react';
const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Carrer paths"
];

const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCard=(value)=>
        {
         
            setCurrentTab(value);
            const result=HomePageExplore.filter((course)=>course.tag===value)
            setCourses(result[0].courses)
            setCurrentCard(result[0].courses[0].heading)
        }


  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the 
           <HighlightText text={" Power of Code"}/>
        </div>
        <p className='text-center text-richblack-300 text-m font-bold text-[16px] mt-3'>
            Learn to build anything you can imagine
        </p>

         <div className='flex flex-col md:flex-row md:rounded-full bg-richblack-800 mb-5 mt-5 border-richblack-100 px-2 py-2  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
         {tabsName.map((ele, index) => {
          return (
            <div
              className={` text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCard(ele)}
            >
              {ele}
            </div>
          );
        })}
         </div>

         <div className='h-[150px]'></div>

         {/*Course Card ka group*/}
         
         <div className='w-full md:absolute flex flex-col md:flex-row gap-10 justify-between -mt-[120px] md:-ml-[270px]'>
         
            {
                   
                courses.map((course,index)=>
                {
                    return (
                      <CourseCard
                      key={index}
                      cardData={course}
                      currentCard={currentCard}
                      setCurrentCard={setCurrentCard}/>

                    )
                })
            }
         </div>


    </div>
  )
}

export default ExploreMore