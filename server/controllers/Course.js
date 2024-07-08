const Category = require("../models/Category");
const Course=require("../models/Course");
const User=require("../models/User"); 
const CourseProgress=require("../models/CouresProgress")
const Section=require("../models/Section");
const SubSection=require("../models/SubSection");




const {uploadImageToCloudinary}=require("../utils/imageUploader");

const {convertSecondsToDuration}=require("../utils/secToDuration");


exports.createCourse=async(req,res)=>
    {
          
       try{ 
         let {
         courseName,
         courseDescription,
         whatYouWillLearn,
         price,
         tag:_tag,
         status,
         category,
         instruction:_instruction
         }=req.body;
         
         const thumbnail=req.files.thumbnailImage;
      
         const tags = JSON.parse(_tag)
         const instructions = JSON.parse(_instruction)
      
         if(!courseName  ||  
             !courseDescription || 
             !whatYouWillLearn||
             !price ||
             !thumbnail||
             ! category ||
              ! tags.length ||
              !instructions.length
              )
            {
               return res.status(400).json({
                  success:false,
                  message:"All fields are required"
               });
            }
            
            if(!status || status===undefined)
               {
                  status="Draft"
               }
            const userId=req.user.id;
            const instructorDetails=await User.findById(userId);

            console.log("Instructor Details",instructorDetails);

            if(!instructorDetails)
               {
                  return res.status(404).json({
                     success:false,
                     message:"Instructor Deatils not found"
                  })
               }

               const categoryDetails=await Category.findById(category);

               if(!categoryDetails)
                  {
                     return res.status(404).json({
                        success:false,
                        message:"Category Deatils not found"
                     })
                  }


               const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

               const newCourse=await Course.create({
                  courseName,
                  courseDescription,
                  instructor:instructorDetails._id,
                  whatYouWillLearn,
                  price,
                  tag:tags,
                  instruction:instructions,
                  category:categoryDetails._id,
                  thumbnail:thumbnailImage.secure_url,
                  status:status,
               })
               
               await User.findByIdAndUpdate(instructorDetails._id,
                 {
                  $push:{
                     courses:newCourse._id
                  }
                 },
                 {new :true}
               )


              const categoryDetails2= await Category.findByIdAndUpdate({_id:categoryDetails._id},
                  {
                     $push:{
                        courses:newCourse._id
                     }
                  },
                  {new :true}
               )
          

               res.status(200).json({
                  success:true,
                  messgae:"Course Created Successfully",
                  data:newCourse
               })

       }catch(error)
       {
         console.error(error);
         return res.status(300).json({
            success:false,
            message:"Failed to created the course",
            error:error.message
         })
       }
    }

exports.editCourse=async(req,res)=>
   {
      try
      {
         const {courseId}=req.body;
         const updates=req.body;

         const course=await Course.findById(courseId);
         if(!course)
            {
               return res.status(404).json({
                  success:false,
                  message:"Course Not found"
               })
            }

            if(req.files)
               {
                  console.log("Thumbnail Update");
                  const thumbnailImage=req.files.thumbnailImage;

                  const response=await uploadImageToCloudinary(thumbnailImage,process.env.FOLDER_NAME);

                  course.thumbnail=response.secure_url;

               }

              for(const key in updates)
               {
                  if(updates.hasOwnProperty(key))
                     {
                        if(key=="tag" || key=="instruction")
                           {
                               course[key]=updates[key].split(",");
                           }
                           else
                           {
                              course[key]=updates[key];
                           }
                     }
               }
               await course.save();

               const updatedCourse=await Course.findById(courseId)
               .populate({
                  path: "instructor",
                  populate: {
                    path: "additionalDetails",
                  },
                })
                .populate({
                  path: "instructor",
                  populate: {
                    path: "additionalDetails",
                  },
                })
                .populate("category")
                .populate("ratingAndReviews")
                .populate({
                  path: "courseContent",
                  populate: {
                    path: "subSection",
                  },
                })
                .exec()

                return res.status(200).json({
                  success:true,
                  message:"Course upadted Successfully",
                  data:updatedCourse
                })

      }catch(error)
      {
             return res.status(500).json({
               success:false,
               message:"Cannot able to update the course",
               error:error.message
             })
      }
   }


exports.getAllCourses=async(req,res)=>
      {
            try{

               const dataCourses=await Course.find({},
                  {status:"Published"},
                  {courseName:true,
                  price:true,
                  thumbnail:true,
                  instructor:true,
                  ratingAndReviews:true,
                 studentsEnrolled:true
                  }).populate("instructor").exec();

               
               return res.status(200).json({
                  success:true,
                  message:"Data for all courses fetch successfully",
                  data:dataCourses
               })

            }catch(error){

               return res.status(500).json({
                  success:false,
                  message:"Failed to fetch courses",
                  error:error.message
               })

            }
      }


   exports.getCourseDetails=async(req,res)=>
      {
         
         try{
            
            const{courseId}=req.body;
            const courseDetails=await Course.findOne({_id:courseId})   
           . populate({
               path:"instructor",
               populate:{
                  path:"additionalDetails"
               }
            }).
            populate({
               path:"courseContent",
               populate:{
                  path:"subSection",
               }
            }).
            populate("category").
            populate("ratingAndReviews").exec();

            //validation
          
       console.log("Course Details",courseDetails)

            if(!courseDetails)
               {
                  return res.status(400).json({
                     success:false,
                     message:`Unable to find a course with id ${courseId}`
                  })
               }
              
               let totalSecond=0;

               courseDetails.courseContent.forEach((section)=>
               {
                  section.subSection.forEach((subSection)=>
                  {
                     const timeInSecond=parseInt(subSection.timeDuration)
                     totalSecond+=timeInSecond
                  })
               })


              const timeDuration=convertSecondsToDuration(totalSecond);

            return res.status(200).json({
               success:true,
               data:{
                  courseDetails,
                  timeDuration
               },
            });

         }catch (error){


            return res.status(500).json({
               success:false,
               message:"Unable to fetch the details",
               error:error.message
            })

         }
      }


   exports.getFullCourseDetails=async(req,res)=>
      {
         try
         {

            
            const {courseId}=req.body;
            
            const userId=req.user.id;
            
           
            const courseDetails=await Course.findOne({_id:courseId})
            .populate({
               path:"instructor",
               populate:{
                  path:"additionalDetails"
               },
            })
            .populate("ratingAndReviews")
            .populate("category")
            .populate({
               path:"courseContent",
               populate:{
                  path:"subSection"
               }
            })
            .exec();

            console.log("Course Details",courseDetails);

            if(!courseDetails)
               {
                  return res.status(404).json({
                     success:false,
                     message:`Cannot able to find the course with id ${courseId}`
                  })
               }


           let courseProgressCount=await CourseProgress.findOne(
            {
               courseId:courseId,
               userId:userId
            }
           )

           console.log("Course Progress Count",courseProgressCount);

           let totalDurationInSeconds = 0
         courseDetails.courseContent.forEach((content) => {
         content.subSection.forEach((subSection) => {
         const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })

    }catch(error)
         {
               return res.status(500).json({
                  succes:false,
                  message:"Unable to find the course details",
                  error:error.message
               })
         }
      }

   exports.getInstructorCourses=async(req,res)=>
      {
         try
         {

            const instructorId=req.user.id;

            const allInstructorCourses=await Course.find({
               instructor:instructorId
            }).sort({createdAt:-1})
            

            return res.status(200).json({
               success:true,
               data:allInstructorCourses
            })

         }catch(error)
         {
                return res.status(500).json({
                  success:false,
                  message:"Failed to reterive instructor course",
                  error:error.message
                })
         }
      }


   exports.deleteCourse=async(req,res)=>
         {
            try
            {

               const {courseId}=req.body;

            

               const course=await Course.findById(courseId);

               console.log("Course",course);

               if(!course)
                  {
                     return res.status(404).json(
                        {
                        success:false,
                        message:"Unable to find the course"
                        }
                     )
                  }
                   let studentsEnrolled=course.studentsEnrolled
                  for(let studentsId of studentsEnrolled )
                     {
                        await User.findByIdAndUpdate(courseId,
                           {
                              $pull:{
                                 courses:courseId
                              }
                           }
                        )
                     }

                let section=course.courseContent;

                for(const sectionId of section)
                  {
                     const sectionDetails=await Section.findById(sectionId);

                     if(sectionDetails)
                        {
                           const subSection=sectionDetails.subSection;

                           for(let subSectionId of subSection)
                              {
                                 await SubSection.findByIdAndDelete(subSectionId);
                              }
                              await Section.findByIdAndDelete(sectionId);
                        }
                  }

                  await Course.findByIdAndDelete(courseId);


                  return res.status(200).json({
                     success:true,
                     message:"Course Deleted Successfully"
                  })

            }catch(error)
            {

               return res.status(500).json({
                  success: false,
                  message: "Server error",
                  error: error.message,
                })

            }
         }