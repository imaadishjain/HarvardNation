const User=require("../models/User");
const Profile=require("../models/Profile");
const Course=require("../models/Course")
const mongoose=require("mongoose");
const Section=require("../models/Section");


const CouresProgress=require("../models/CouresProgress");
const { convertSecondsToDuration }=require( "../utils/secToDuration");

const {uploadImageToCloudinary}=require("../utils/imageUploader");

require("dotenv").config();


exports.updateProfile=async(req,res)=>
    {
        try{
            const{
                firstName="",
                lastName="",
                dateOfBirth="",
                about="",
                contactNumber="",
                gender=""
            }=req.body;

            const id=req.user.id;


            const userDetails=await User.findById(id);

            const profileId=userDetails.additionalDetails;

            const profileDetails=await Profile.findById(profileId);

            if(firstName!=="")
                {
            userDetails.firstName=firstName;
                }
                if(lastName!=="")
                {
            userDetails.lastName=lastName;
                }
            await userDetails.save();
            
            profileDetails.dateOfBirth=dateOfBirth;
            profileDetails.about=about;
            profileDetails.gender=gender;
            profileDetails.contactNumber=contactNumber;
            
            await profileDetails.save();
      
         const updatedUserDetails=await User.findById(id).populate("additionalDetails").exec();


                return res.status(200).json({
                    success:true,
                    message:"Profile Updated Successfully",
                     updatedUserDetails,
                })
            
         }
         catch(error)
         {
             return res.status(500).json({
                success:false,
                message:"Failed to update profile please try again later",
                error:error.message
             })
         }
    }



exports.deleteAccount=async(req,res)=>
    {
        try{
            
            const userId=req.user.id;
         
            const userDetails=await User.findById(userId);

            if(!userDetails )
                {
                    return res.status(400).json({
                        success:false,
                        message:"User not found"
                    })
                }
                const profileId=new mongoose.Types.ObjectId(userDetails.additionalDetails);

                await Profile.findByIdAndDelete({_id:profileId});
                
                if(userDetails.accountType=="Student")
                    {
                    for(let courseId of userDetails.courses)
                    {
                await Course.findByIdAndUpdate(courseId,
                    {
                        $pull:
                        {
                            studentsEnrolled:userId
                        },
                    },
                    {new:true}
                )
                  }
            
                }

                await User.findByIdAndDelete(userId);
              


                return res.status(200).json({
                    success:true,
                    message:"Account Deleted Successfully"
                })

        }catch(error)
        {
            return res.status(500).json({
                success:false,
                messag:"Failed to deleted the account,please try again later",
                error:error.message
            })
        }
    }
   
exports.getAllUserDetails=async(req,res)=>
        {
            try
            {
                const id=req.user.id;
                const userDetails=await User.findById(id).populate("additionalDetails").exec();

                 
                 console.log("User Deatils",userDetails);

                return res.status(200).json({
                    success:true,
                    message:"User data fetch successfully",
                    data:userDetails
                })
                   
            }
            catch(error){
                 
                return res.status(500).json({
                    success:false,
                    message:"Failed to fetch data",
                    error:error.message
                })
            }
        }

exports.updateDisplayPicture=async(req,res)=>
{
         try
         {
             if(!req.files)
                {
                    return res.status(200).json({
                        success:false,
                        message:"Please Upload Image"
                    })
                }
            const image=req.files.displayPicture;
            if(!image)
                {
                    return res.status(404).json({
                        success:false,
                        message:"Please upload Image"
                    })
                }

                const userId=req.user.id;

                const imageUpload=await uploadImageToCloudinary(image,process.env.FOLDER_NAME,1000,1000);
                
                console.log(imageUpload);

                const updatedUser=await User.findOneAndUpdate({_id:userId},
                    {
                        image:imageUpload.secure_url
                    },
                    {new:true}
                )
                return res.status(200).json({
                    success:true,
                    message:"Image Uploaded Successfully",
                    data:updatedUser,
                })


         }catch(error)
         {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
         }
}

exports.instructorDashboard=async(req,res)=>
    {
        console.log("Control reaches");
        try
        {
           
            const instructorId=req.user.id;
       
            const courses=await Course.find({instructor:instructorId});
            const courseData=courses.map((course)=>{

            const totalStudentsEnrolled=course.studentsEnrolled.length;

            const totalAmountGenerated=course.price*totalStudentsEnrolled;

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                totalStudentsEnrolled,
                totalAmountGenerated,
              }
        
              return courseDataWithStats
            })

            return res.status(200).json({
                success:true,
                data:courseData
            })
            

        }catch(error)
        {
              return res.status(500).json({
                success:false,
                message:"Server Error"
              })
        }
    }


    exports.getEnrolledCourses=async(req,res)=>
        {
           
            try{
                const  userId=req.user.id;
              
                let userDetails=await User.findById(userId)
                .populate({
                    path: "courses",
                    populate: {
                      path: "courseContent",
                      populate: {
                        path: "subSection",
                      },
                    },
                  })
                  .exec()
              
                 
              
                if(!userDetails)
                    {
                        return res.status(400).json({
                            success:false,
                            message:`Cannot find user with user id ${userId}`
                        })
                    }
                
                    
                 userDetails=userDetails.toObject();
                
                var subSectionLength=0;

                for(var i=0;i<userDetails.courses.length;i++)
                    {
                       let totalDurationInSeconds=0;
                        subSectionLength=0;

                       for(var j=0;j<userDetails.courses[i].courseContent.length;j++)
                        {

                            totalDurationInSeconds+=userDetails.courses[i].courseContent[j].
                            subSection.reduce((acc,curr)=>acc+parseInt(curr.timeDuration),0)

                            userDetails.courses[i].timeDuration=convertSecondsToDuration(totalDurationInSeconds)

                            subSectionLength+=userDetails.courses[i].courseContent[j].subSection.length
                        }
                      
                      let courseProgressCount=await CouresProgress.findOne({
                        userId: userId,
                        courseId: userDetails.courses[i]._id,
                     
                      })
                       console.log("courseProgresCount",courseProgressCount);
                      courseProgressCount=courseProgressCount?.completedVideos.length
                      if(subSectionLength==0)
                        {
                            userDetails.courses[i].progressPercentage=100
                        }
                        else
                        {
                           const multiplier=Math.pow(10,2);
                           userDetails.courses[i].progressPercentage=
                           Math.round(
                            (courseProgressCount / subSectionLength) * 100 * multiplier
                          ) / multiplier
                        }

                    }



                    return res.status(200).json({
                        success:true,
                        data:userDetails.courses
                    })
                
                
            }catch(error)
            {

                return res.status(500).json({
                    success: false,
                    message: error.message,
                  })
            }
        }