const RatingandReview=require("../models/RatingandReview");
const Course=require("../models/Course");



exports.createRating=async(req,res)=>
    {
        try
        {
             const userId=req.user.id;

           const{rating,review,courseId}=req.body;

           const courseDetails=await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}});

           if(!courseDetails)
           {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in a course'
            })
           }
             
           
          const alreadyReviewed=await RatingandReview.findOne({
            user:userId,
            course:courseId
          });

        
          if(alreadyReviewed)
            {
                return res.status(200).json({
                    success:false,
                    message:"Course already reviewed by the user"
                })
            }
             
             
            const ratingAndReviews=await RatingandReview.create({
                user:userId,
                rating,
                review,
                course:courseId
            })
          
           const updatedCourseDetails= await Course.findByIdAndUpdate(courseId,
                {
                    $push:{
                        ratingAndReviews:ratingAndReviews._id
                    }
                },
                {new:true}
            )

        

 
             return res.status(200).json({
                success:true,
                message:"Rating and Review added Successfully",
                ratingAndReviews
             })

        }catch(error)
        {
             return res.status(500).json({
                success:false,
                message:"Something went wrong while creating a review"
             })
        }
    }


exports.getAverageRating=async(req,res)=>
    {
        try{
              
        
           const{courseId}=req.body;
            //courseId is String

           const result=await RatingandReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}, 
                }
            }
           ]);
           console.log("Result",result);
           if(result.length>0)
            {
                return res.status(200).json({
                    success:true,
                    averageRating:result[0].averageRating
                })
            }
          
            return res.status(200).json({
                success:true,
                message:"Average Rating is 0, no rating is given till now",
                averageRating:0
            })

        }catch(error)
        {
                return res.status(500).json({
                    success:false,
                    message:"Failed to calculate the rating"
                })
        }
    }



exports.getAllRating=async(req,res)=>
    {
        try
        {

            const allRatingAndReview=await RatingandReview.find({})
                                            .sort({rating:"desc"}).
                                            populate({
                                                path:"user",
                                                select :"firstName lastName email image",
                                            }).
                                            populate({
                                                path:"course",
                                                select : "courseName",
                                            }).exec();
           
          console.log("All Rating and Review",allRatingAndReview);

          return res.status(200).json({
            success:true,
            message:"All rating and reviews fetch successfully",
            data:allRatingAndReview,
          })

        }catch(error)
        {
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
