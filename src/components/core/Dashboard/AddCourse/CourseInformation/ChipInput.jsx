import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useState } from 'react'
import { MdClose } from 'react-icons/md'

const ChipInput = (
    {
        name,
        label,
        register,
        setValue,
        getValues,
        errors,
        placeholder
    }
) => {

    const{editCourse,course}=useSelector((state)=>state.course)

    const[chips,setChip]=useState([])

    useEffect(()=>
    {
        if(editCourse)
            {
                setChip(course?.tag)
            }
           register(name,{required:true,validate:(value)=>value.length>0})
    },[])

    useEffect(()=>
     {
      setValue(name,chips)
      },[chips])

      const handlekeyDown=(event)=>
        {
            if(event.key==="Enter" || event.key===",")
                {
                    event.preventDefault();
                    const chipValue=event.target.value.trim();

                    if(chipValue && !chips.includes(chipValue))
                        {
                            const newChips=[...chips,chipValue];
                            setChip(newChips);
                            event.target.value=""
                        }
                }
        }

        const handleDelete=(index)=>
            {
                const updateChip=[...chips]
                updateChip.splice(index,1);
                setChip(updateChip)
            }


  return (
    <div>
        <div className="flex flex-col space-y-2">
            <label  className="text-sm text-richblack-5" htmlFor={name} >{label}</label>
            <div className="flex w-full flex-wrap gap-y-2">
                {
                    chips.map((chip,index)=>
                    {
                        return (
                            <div key={index}
                            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                              {chip}
                            

                              <button
                               className="ml-2 focus:outline-none"
                              onClick={()=>handleDelete(index)}>
                                  <MdClose/>
                            </button>
                        </div>
                        )
                    })
                }
          
            <input
                name={name}
                placeholder={placeholder}
                id={name}
                type="text"
                 onKeyDown={handlekeyDown}
                 className="form-style w-full"
            />
        </div>
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>
            )
        }
        </div>
    </div>
  )
}

export default ChipInput