const Course = require("../models/Course");
const CourseProgress=require("../models/CouresProgress");

const SubSection=require("../models/SubSection");


exports.updateCourseProgress=async(req,res)=>
    {
        try
        {
            
            const {courseId,subSectionId}=req.body;
            const userId=req.user.id;
             
            const subSectionDetails=await SubSection.findById(subSectionId);

            if(!subSectionDetails)
                {
                    return res.status(404).json({
                        success:false,
                        message:"SubSection not found"
                    })
                }


                let courseProgressDeatils=await CourseProgress.findOne(
                    {
                      userId:userId,
                      courseId:courseId
                    }
                )
               
           
                if(!courseProgressDeatils)
                {
                    return res.status(404).json({
                        success:'false',
                        message:"Course Progress of respective user and course is not found"
                    })
                }
                else
                {
            
                if(courseProgressDeatils?.completedVideos?.includes(subSectionId))
                    {
                        return res.status(200).json({
                            success:false,
                            message:"Subsection already completed"
                        })
                    }
                   
                   courseProgressDeatils.completedVideos.push(subSectionId);
                }

                await courseProgressDeatils.save();

                
                
               return res.status(200).json({
                success:true,
                message:"Successfully Course Progress is Updated"
               })



        }catch(error)
        {

            return res.status(500).json({
                success:false,
                message:"Failed to update the course progress"
            })

        }

            
    }
