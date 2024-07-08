const { populate } = require("../models/Category");
const Course=require("../models/Course");

const Section=require("../models/Section");

const SubSection=require("../models/SubSection")



exports.createSection=async(req,res)=>
{

    
    try{

        const {sectionName,courseId}=req.body;

        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            });
        }

        const newSection=await Section.create({sectionName});

        const updatedCourseDetails= await Course.findByIdAndUpdate(courseId,
            {
                $push:
                {
                    courseContent:newSection._id
                }
            },
            {new:true}
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

         
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            data:updatedCourseDetails,
        })
    }
    catch(error)
    {
         return res.status().json(
            {
                success:false,
                message:"Failed to create a section",
                error:error.message
            }
         )
    } 
}


exports.updateSection=async(req,res)=>
    {
        try{
         
           const{sectionName,sectionId,courseId}=req.body;

           if(!sectionName)
            {
                return res.status(400).json({
                    success:false,
                    message:"Enter the course name"
                })
            }

            const updatedSection=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

            const updatedCourse=await Course.findById(courseId)
            .populate(
                {
                    path:"courseContent",
                    populate:{
                        path:"subSection",
                    },
                }
            ).exec();

            return res.status(200).json(
                {
               success:true,
               message:"Section name upadted Successfully",
               data:updatedCourse
                }
            )

        }catch(error)
        {
     
            return res.status(500).json({
               
                success:false,
                message:"Failed to updated the section, please try later"
            }
            )
    
        }
    }



exports.deleteSection=async(req,res)=>
    {
        try
        { 
          
            const{sectionId,courseId}= req.body;
 
            console.log("Section and Course Id",sectionId,courseId);
            const section=await Section.findById(sectionId);
             if(!section)
            {
                return res.status(404).json({
                    success:false,
                    message:"Section not found"
                })
            }

            await Course.findByIdAndUpdate(courseId,
                {
                    $pull:
                    {
                        courseContent:sectionId
                    }
                },
            );


            await SubSection.deleteMany({_id:{$in:section.subSection}});
            await Section.findByIdAndDelete(sectionId);
          
            const updatedCourse=await Course.findById(courseId)
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }).exec();

            return res.status(200).json({
                success:true,
                message:"Section deleted Successfully",
                data:updatedCourse
            });

            
        }
        catch(error){
            return res.status(500).json({
               
                success:false,
                message:"Failed to delete the section, please try later",
                error:error.message
            }
            )
        }
    }