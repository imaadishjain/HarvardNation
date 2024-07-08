
const { FaCommentsDollar } = require("react-icons/fa6");
const Course = require("../models/Course");
const { findByIdAndUpdate } =require("../models/Profile");
const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


require("dotenv").config();




exports.createSubSection=async(req,res)=>
    {
        
        try
        {
            const{title,description,sectionId,courseId}=req.body;
              
          
            if(!req.files)
                {
                    return res.status(404).json({
                        success:false,
                        message:"Please upload a video"
                    })
                }
            const video=req.files.videoFile;
            console.log("Video File",video)
            if(!sectionId || !title || !description || !video)
                {
                    return res.status(400).json({
                        success:false,
                        message:"All fields are required"
                    })
                }

            const uploadVideo=await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME);

            const subSectionDetails=await SubSection.create({
                title:title,
                timeDuration:`${uploadVideo.duration}`,
                description:description,
                videoUrl:uploadVideo.secure_url
            })

          const updatedSection=await Section.findByIdAndUpdate(sectionId,
            {
                $push:
                {
                    subSection:subSectionDetails._id
                }
            },
            {new: true},
          ).populate("subSection");

          console.log("Updated Section",updatedSection);

          const updatedCourse=await Course.findById(courseId)
          .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
          });

          return res.status(200).json({
            success:true,
            message:"SubSection created Successfully",
            data:updatedCourse
          })
            
        }catch(error){

           return res.status(500).json({
            success:false,
            message:"Failed to create the subsection",
            error:error.message,
           })

        }
       
    }




exports.updateSubSection=async(req,res)=>
    {
        try
        {

            const{sectionId,title,description,subSectionId,courseId}=req.body;
            const subSection=await SubSection.findById(subSectionId);

            if(!subSection)
                {
                    return res.status(404).json({
                        success:false,
                        message:"Subsection not  found"
                    })
                }

            

            if(title!==undefined)
                {
                    subSection.title=title;
                }

                if(description!==undefined)
                    {
                        subSection.description=description;
                    }

                if(req.files && req.files.video !=undefined)
                    {
                        const video=req.files.video;
                        const uploadVideo=await uploadImageToCloudinary(
                            
                            video,
                            process.env.FOLDER_NAME
                            
                        )
                        subSection.videoUrl = uploadVideo.secure_url
                       subSection.timeDuration = `${uploadVideo.duration}`
                    }

            
              await subSection.save();

              const updatedSection=await Section.findById(sectionId).
              populate("subSection").exec();

              const updatedCourse=await Course.findById(courseId)
          .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
          });
              
            return res.status(200).json({
                success:true,
                message:"SubSection updated Successfully",
                data:updatedCourse
            })

        }catch(error)
        {
            return res.status(500).json({
                success:false,
                message:"Failed to update the Subsection",
                error:message.error
            })
        }
    }




    exports.deleteSubSection=async(req,res)=>
        {
            try
            {

                             //req.body-->req.params
                const {sectionId,subSectionId,courseId}=req.body;

                await Section.findByIdAndUpdate(sectionId,
                    {
                        $pull:
                        {
                            subSection:subSectionId
                        }
                    },
                    {new:true}
                )
              
                const updateSubSection=await SubSection.findByIdAndDelete({_id:subSectionId});
                console.log(updateSubSection);
                if(!updateSubSection)
                    {
                        return res.status(404).json({
                            success:false,
                            message:"SubSection not found"
                        })
                    }

                const updatedSection=await Section.findById(sectionId).populate("subSection").exec() ;
                
          const updatedCourse=await Course.findById(courseId)
          .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
          });
                return res.status(200).json({
                    success:true,
                    message:"SubSection deleted Successfully",
                    data:updatedCourse
                })

            }catch(error)
            {
                return res.status(500).json({
                    success:false,
                    message:"Failed to delete the subsection",
                    error:error.message
                })
            }
        }