import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {fetchCourseCategories} from "../../../../../Services/operations/courseDetailsAPI.js"
import { useForm} from "react-hook-form"
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField.jsx';
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import { editCourseDetails } from '../../../../../Services/operations/courseDetailsAPI.js';
import { addCourseDetails } from '../../../../../Services/operations/courseDetailsAPI.js';
import { COURSE_STATUS } from "../../../../../utils/constants"
import { MdNavigateNext } from "react-icons/md"
import ChipInput from './ChipInput.jsx';
import Upload from '../Upload.jsx';

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()


   const dispatch=useDispatch();
   const{course,editCourse}=useSelector((state)=>state.course);
  const{token}=useSelector((state)=>state.auth)
   const [loading,setLoading]=useState(false);

   const[courseCategories,setCourseCategory]=useState([]);

   const getCategories=async()=>
    {
      setLoading(true);
      const categories=await fetchCourseCategories();
      if(categories.length>0)
        {
          setCourseCategory(categories);
        }
        setLoading(false);
    }


   useEffect(()=>
  {
     getCategories();
     if(editCourse)
      {
        setValue("courseTitle",course.courseName);
        setValue("courseShortDesc",course.courseDescription);
        setValue("coursePrice",course.price);
        setValue("courseTag",course.tag);
        setValue("courseBenefits",course.whatYouWillLearn);
        setValue("courseCategory",course.category);
        setValue("courseRequirements",course.instructions);
        setValue("courseImage",course.thumbnail);

      }
  },[])

  const isFormUpdated=()=>
    {
      const currentValues=getValues();
      if(currentValues.courseTitle !== course.courseName || 
         currentValues.courseShortDesc !== course.courseShortDesc ||
         currentValues.coursePrice !== course.Price ||
         currentValues.courseTags.toString()!== course.tag.toString() ||
         currentValues.courseBenefits !== course.whatYouWillLearn ||
         currentValues.courseCategory !== course.category ||
         currentValues.courseImage !== course.thumbnail ||
         currentValues.courseRequirements.toString()!=course.instruction.toString()

      )
        {
          return true
        }
        else
        {
          return false
        }
        
    }

    const onSubmit = async (data) => {
      
       
      if (editCourse) {
        // const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        // console.log("now course:", course)
        // console.log("Has Form Changed:", isFormUpdated())
        if (isFormUpdated()) {
          const currentValues = getValues()
          const formData = new FormData()
         
          formData.append("courseId", course._id)
          if (currentValues.courseTitle !== course.courseName) {
            formData.append("courseName", data.courseTitle)
          }
          if (currentValues.courseShortDesc !== course.courseDescription) {
            formData.append("courseDescription", data.courseShortDesc)
          }
          if (currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice)
          }
          if (currentValues.courseTags.toString() !== course.tag.toString()) {
            formData.append("tag", JSON.stringify(data.courseTags))
          }
          if (currentValues.courseBenefits !== course.whatYouWillLearn) {
            formData.append("whatYouWillLearn", data.courseBenefits)
          }
          if (currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory)
          }
          if (
            currentValues.courseRequirements.toString() !==
            course.instruction.toString()
          ) {
            formData.append(
              "instructions",
              JSON.stringify(data.courseRequirements)
            )
          }
          if (currentValues.courseImage !== course.thumbnail) {
            formData.append("thumbnailImage", data.courseImage)
          }
          // console.log("Edit Form data: ", formData)
          setLoading(true)
          const result = await editCourseDetails(formData, token)
          setLoading(false)
          if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
          }
        } else {
          toast.error("No changes made to the form")
        }
        return
      }
  
      const formData = new FormData()
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("instruction", JSON.stringify(data.courseRequirements))
      formData.append("thumbnailImage", data.courseImage)
      setLoading(true)

     
      const result = await addCourseDetails(formData, token)
      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
      setLoading(false)
    }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"> 
           
         <div>
            <label htmlFor='courseTitle' className="text-sm text-richblack-5">Course Title <sub className="text-pink-200">*</sub></label>
            <input
              id='courseTitle'
              placeholder='Enter Course Title'
              {...register("courseTitle",{required:true})}
              className="form-style w-full"
            />
            {
              errors.courseTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required**</span>
              )
            }
         </div>

         <div className="flex flex-col space-y-2">
          <label htmlFor='courseShortDesc' className="text-sm text-richblack-5">Course Short Description <sub className="text-pink-200">*</sub></label>
           <input
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc",{required:true})}
             className="form-style resize-x-none min-h-[130px] w-full"
           />
           {
            errors.courseShortDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required</span>
            )
           }
         </div>


         <div className="flex flex-col space-y-2">
            <label htmlFor='coursePrice' className="text-sm text-richblack-5">Course Price<sub className="text-pink-200">*</sub></label>
            <input
              id='coursePrice'
              placeholder='Enter Course Price'
              {...register("coursePrice",{
                required:true,
                valueAsNumber:true,
                pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
              })}
              className="form-style w-full !pl-12"
            />
            <HiOutlineCurrencyRupee  className=" translate-x-[4px]  inline-block -translate-y-[45px] text-2xl text-richblack-400"/>
            {
              errors.coursePrice && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required**</span>
              )
            }
         </div>

         <div className="flex flex-col space-y-2">
          <label htmlFor='courseCategory' className="text-sm text-richblack-5">Course Category<sub className="text-pink-200">*</sub></label>
          <select
          id="courseCategory"
          name="courseCategory"
          className='form-style w-full'
          defaultValue=""
          {...register("courseCategory",{
            required:true
          })}
          >
          <option value="" disabled>Choose Category</option>
          {
            ! loading && (
              courseCategories.map((category,index)=>
              {
                return (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
                )
              })
            )
          }

          </select>
          {
            errors.courseCategory &&  (
              <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is required</span>
            )
          }
         </div>

         <ChipInput
          label={"Tags"}
          name={"courseTags"}
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          placeholder="Enter the Tag and press Enter"
         />

         {/*Upload Thumbnail*/}
          <Upload
            name="courseImage"
            label="CourseThumbnail"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
             editData={editCourse ? course?.thumbnail:null}
          />
 


         <div className="flex flex-col space-y-2">
           <label htmlFor='courseBenefits' className="text-sm text-richblack-5">Benefits of the Course <sub className="text-pink-200">*</sub></label>
           <textarea
            id='courseBenefits'
            name="courseBenefits"
            placeholder='Enter the Benefits of the course'
            {...register("courseBenefits",{required:true})}
              className="form-style resize-x-none min-h-[130px] w-full"
           />
           {
            errors.courseBenefits && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">Benefits of the course are required</span>
            )
           }
         </div>
         <RequirementField
          name="courseRequirements"
          label="Requirement/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
         />

         <div className="flex justify-end gap-x-2">
          {
            editCourse && (
              <button
               onClick={()=>dispatch(setStep(2))}
               className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                Continue Without Saving
              </button>
            )
          }
          <IconBtn  type="submit"  disabled={loading} text={!editCourse?"Next":"Save Change"}>
          <MdNavigateNext />
          </IconBtn>
         </div>

      </form>

    </>
  )
}

export default CourseInformationForm