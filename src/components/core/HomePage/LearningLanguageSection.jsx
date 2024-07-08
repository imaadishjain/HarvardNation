import React from 'react'
import HighlightText from "./HighlightText"
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningLanguageSection = () => {
  return (
    <div >     
            <div className="text-4xl font-semibold text-center my-10">
              Your Swiss knife for
              <HighlightText text={" learning any language"}/>
           
            
          <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img src={knowYourProgress}
          alt="Know Your Progress Image"
            className="object-contain  lg:-mr-32 "
          />

          <img src={compareWithOthers}
          alt="Compare with others"
         className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />

           <img src={planYourLesson}
           alt="Plan Your lesson"
           className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
          />

          </div>
          </div>
          <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div>Learn More</div>
            </CTAButton>
          </div>

     
    </div>
  )
}

export default LearningLanguageSection