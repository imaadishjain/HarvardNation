import React from 'react'
import { useSelector } from 'react-redux'
import { BsDashCircle } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";

const CheckPassword = () => {
    const{includeLowerCase,includeUpperCase,includeNumbers,includeSpecial,length}=useSelector((state)=>state.auth)
  return (
    <div className=" flex flex-row flex-wrap bg-richblack-1000 mt-2  h-[150px] gap-x-4 ">
       <div className={`${includeUpperCase?"text-caribbeangreen-500":"text-red-500"} flex flex-row gap-3 items-center`}>
         {
            includeUpperCase ? 
            (
                
                <SiTicktick />
            )
             :
             (
                <BsDashCircle />
             )
         }
         <p>one upper-case character</p>

       </div>

       <div className={`${includeLowerCase?"text-caribbeangreen-500":"text-red-500"} flex flex-row gap-3 items-center`}>
         {
            includeLowerCase ? 
            (
                
                <SiTicktick 
                 
                />
            )
             :
             (
                <BsDashCircle 
                
                />
             )
         }
         <p>one lower-case character</p>

       </div>
        

       <div className={`${includeSpecial?"text-caribbeangreen-500":"text-red-500"} flex flex-row gap-3 items-center`}>
         {
            includeSpecial ? 
            (
                
                <SiTicktick/>
            )
             :
             (
                <BsDashCircle/>
             )
         }
         <p>one special character</p>

       </div> 

       <div className={`${includeNumbers?"text-caribbeangreen-500":"text-red-500"} flex flex-row gap-3 items-center`}>
         {
            includeNumbers? 
            (
               
                <SiTicktick 
                 
                />
            )
             :
             (
                <BsDashCircle />
                 
             )
         }
         <p>one number character</p>

       </div>

       <div className={`${length?"text-caribbeangreen-500":"text-red-500"} flex flex-row gap-3 items-center`}>
         {
            (length) ? 
            (
                
                <SiTicktick/>
            )
             :
             (
                <BsDashCircle 
                 />
             )
         }
         <p >8 character minimum</p>

       </div>
    </div>
  )
}

export default CheckPassword