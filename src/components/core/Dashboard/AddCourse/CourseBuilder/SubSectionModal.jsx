import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { createSubSection, updateSubSection } from '../../../../../Services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { IoCloseCircleOutline } from "react-icons/io5";
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';

const SubSectionModal = ({
  modalData,
  setModalData,
  add=false,
  view=false,
  edit=false,

}) => {

  const{
    register,
    handleSubmit,
    formState:{errors},
    setValue,
    getValues
  }=useForm()
  const dispatch=useDispatch();


  const[loading,setLoading]=useState(false);
  const {course}=useSelector((state)=>state.course);
  const{token}=useSelector((state)=>state.auth);

  useEffect(()=>
  {
      if(view || edit)
        {
          setValue("lectureTitle",modalData.title);
          setValue("lectureDesc",modalData.description);
          setValue("lectureVideo",modalData.videoUrl);
        }
  },[])

  const isFormUpdated=()=>
    {
      const currentValues=getValues();
      if(currentValues.lectureTitle!==modalData.title ||
        currentValues.lectureDesc!==modalData.description ||
        currentValues.lectureVideo!==modalData.videoUrl 
       )
       {
            return true;
       }
       else
       {
        return false
       }
    }
   const handleEditSubSection=async ()=>
   {

       const currentValues=getValues();

       const formData=new FormData();
       formData.append("sectionId",modalData.sectionId);
       formData.append("subSectionId",modalData._id);
       formData.append("courseId",course._id)

        if(currentValues.lectureTitle!==modalData.title)
          {
            formData.append("title",currentValues.lectureTitle);
          }
          if(currentValues.lectureDesc!==modalData.description)
            {
              formData.append("description",currentValues.lectureDesc);
            }
            if(currentValues.lectureVideo!==modalData.videoUrl)
              {
                formData.append("video",currentValues.lectureVideo);
              }

              setLoading(true);
          
              const result=await updateSubSection(formData,token);
               
              if(result)
                {
                   dispatch(setCourse(result));
                }
                
              
                setModalData(null);
                setLoading(false);

   }

    const onSubmit=async (data)=>
      {
            if(view)
            {
              return;
            } 
            if(edit)
              {
                if(!isFormUpdated)
                  {
                    toast.error("No changes made to the form")
                  }
                  else
                  {
                    handleEditSubSection();
                  }
                  return;
              }
              const formData=new FormData();
              
              formData.append("courseId",course._id);
              formData.append("sectionId",modalData);
              formData.append("title",data.lectureTitle)
              formData.append("description",data.lectureDesc)
              formData.append("videoFile",data.lectureVideo)

              setLoading(true);

              const result=await  createSubSection(formData,token);
              console.log("Result",result);
              
              if(result)
                {

                     dispatch(setCourse(result));
                }
                setModalData(null);
                setLoading(false);

      }




  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
      <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
      <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture </p>
                  <button
                  onClick={()=>(!loading ? setModalData(null) : {})}>
                  <IoCloseCircleOutline className="text-2xl text-richblack-5" />
                  </button>
                 </div>
                 <form
                   className="space-y-8 px-8 py-10"
                 onSubmit={handleSubmit(onSubmit)}>
                   

                  <Upload
                    label="Lecture Video"
                    name="lectureVideo"
                    setValue={setValue}
                    register={register}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl:null}
                    editData={edit? modalData.videoUrl:null}
                  />

                    <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor='lectureTitle'>Lecture Title {!view && <sup className="text-pink-200">*</sup>}</label>
                    <input
                      id="lectureTitle"
                      name="lectureTitle"
                      type='text'
                      placeholder='Enter the title of a lecture'
                      {...register("lectureTitle",{required:true})}
                      className="form-style w-full"
                    />
                    {
                      errors.lectureTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Title is Required</span>
                      )
                    }
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label htmlFor='lectureDesc' className="text-sm text-richblack-5">Lecture Description{" "}
                    {!view && <sup className="text-pink-200">*</sup>}</label>
                    <textarea
                      id="lectureDesc"
                      placeholder='Enter Lecture Description'
                      {...register("lectureDesc",{required:true})}
                       className="form-style resize-x-none min-h-[130px] w-full"

                    />
                    {
                      errors.lectureDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Description is Required</span>
                      )
                    }
                   
                  </div>


                  {
                    !view &&(
                      <div className="flex justify-end">
                         <IconBtn
                          text={loading ? "Loading..." : edit ? "Save Changes" :"Save"}
                         />
                      </div>
                    )
                  }

                 </form>
            </div>
         </div>
  )
}

export default SubSectionModal