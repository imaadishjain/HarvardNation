
import React from 'react'
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa";
import { Link} from 'react-router-dom';
import  {TypeAnimation} from  'react-type-animation'

const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
  return (

    <div className={`flex ${position} my-20 justify-between lg:gap-10`}>

    <div className='w-[50%] flex flex-col gap-8'>
       {heading}
    <div className='text-richblack-300 font-bold '>
        {subheading}
    </div>

     <div className='flex gap-7 mt-7 mb-3'>

     <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
        <div className='flex gap-2 items-center '>
         {ctabtn1.btnText}
         <FaArrowRight/>
        </div>
     </CTAButton>

     <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
     </CTAButton>

     </div>


    </div>

     <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        {backgroundGradient}
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-bold'>
            <p1>1</p1>
            <p1>2</p1>
            <p1>3</p1>
            <p1>4</p1>
            <p1>5</p1>
            <p1>6</p1>
            <p1>7</p1>
            <p1>8</p1>
            <p1>9</p1>
            <p1>10</p1>
            <p1>11</p1>
        </div>

        <div className={`w-[90%] flex-col gap-2 font-bold font-mono ${codeColor}`}>

           <TypeAnimation

            sequence={[codeblock,50000,""]}
            repeat={Infinity}
            cursor={true}
            style={
                {
                whiteSpace:"pre-line",
                display:"block"
                }
            }
            omitDeletionAnimation={true}
           />

        </div>

     </div>
            
    </div>
  )
}

export default CodeBlocks