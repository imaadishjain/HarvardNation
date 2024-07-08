const {instance}=require("../config/razorpay")
const Course=require("../models/Course")
const User=require("../models/User")
const mailSender=require("../utils/mailSender")
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto")


const {paymentSuccessEmail}=require("../mail/templates/paymentSuccessEmail")
const { mongoose } = require("mongoose");
const CouresProgress = require("../models/CouresProgress");




exports.capturePayment=async(req,res)=>
  {
           const{courses}=req.body;

           const userId=req.user.id;

           if(courses.length===0)
            {
              return res.json({
                success:false,
                message:"Please Provide Course Id"
              })
            }

            let totalAmount=0;

            for(const course_id of courses)
              {
                let course;
            
                 try
                 {
                   course=await Course.findById(course_id);
                   if(!course)
                    {
                      return res.status.json({
                        success:false,
                        message:"Could not find the Course"
                      });
                    }
                    const uid=new mongoose.Types.ObjectId(userId);
                    if(course.studentsEnrolled.includes(uid))
                      {
                        return res.status(200).json({
                          success:false,
                          message:"Student is already Enrolled"
                        })
                      }

                      totalAmount+=course.price;

                 }catch(error)
                 {
                   return res.status(404).json({
                    success:false,
                    message:error.message
                   })
                 }
              }

              const currency="INR"
              const options={
                amount:totalAmount*100,
                currency,
                receipt:Math.random(Date.now()).toString(),
              }



              try{
                const paymentResponse=await instance.orders.create(options)
                res.json({
                  success:true,
                  message:paymentResponse
                })
              }
              catch(error)
              {
                res.status(500).json({
                  success:false,
                  message:"Could not Initiate the order"
                })
              }
  }



  exports.verifyPayment=async(req,res)=>
    {
       const razorpay_order_id=req.body?.razorpay_order_id;
       const razorpay_payment_id=req.body?.razorpay_payment_id;
       const razorpay_signature=req.body?.razorpay_signature;

       const courses=req.body?.courses;

       const userId=req.user.id;


       if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId)
        {
          return res.status(200).json({
            success:false,
            message:"Payment Failed"
          })
        }

        let body=razorpay_order_id+"|"+razorpay_payment_id;

        const expectedSignature=crypto
        .createHmac("sha256",process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature)
          {
          


             
            await enrollStudents(courses,userId,res)
          

            return res.status(200).json({
              success:true,
              message:"Payment Verify"
            })
          }


          return res.status(200).json(
            {
               success:false,
               message:"Payment Failed"
            }
          )

    }



const enrollStudents=async(courses,userId,res)=>
  {
         if(!courses || !userId)
          {
            return res.status(400).json({
              success:false,
              message:"Please Provide data for courses or UserId"
            })
          }
         
        for(const courseId of courses)
          {
            try{
              const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
              )
  
              if(!enrolledCourse)
                {
                  return res.status(500).json({
                    success:false,
                    message:"Course not found"
                  })
                }
  
                const courseProgress=await CouresProgress.create({
                  userId:userId,
                  courseId:courseId,
                  completedVideos:[],
                });

              const enrolledStudent=await User.findByIdAndUpdate(userId,
                {
                  $push:{
                    courses:courseId,
                    courseProgress:courseProgress._id
                  }
                },
                {new:true}
              )

             
  
              const studentName=enrolledStudent.firstName+" "+enrolledStudent.lastName;
                    const emailResponse=await mailSender(enrolledStudent.email,`Course Enrollement`,
                          courseEnrollmentEmail(enrolledCourse.courseName,studentName))

            }catch(error)
            {
              return res.status(500).json({
                success:false,
                message:error.message
              })
            }
           
          }

  }




  exports.sendPaymentSuccessEmail=async(req,res)=>
    {
        try{
            let {orderId,paymentId,amount}=req.body;

            const userId=req.user.id;
           
            if(!userId || !orderId || !paymentId || !amount)
            {
                return res.json({
                    success:false,
                    message:"Please Provide all details"
                })
            }

           const enrolledStudent=await User.findById(userId);
            console.log("Enrolled Student",enrolledStudent);
            amount=amount/100;
            const response=await mailSender(enrolledStudent.email,
                `Payment Successfull`,
                paymentSuccessEmail(
                    `${enrolledStudent.firstName}`,
                    amount,
                    orderId,
                    paymentId
                  )
            );
                
            return res.status(200).json({
                status:true,
                message:"Email Sent Successfully"
            })

        }
        catch(error)
        {
          console.log("Error",error);
          console.log("Error Message",error.message);
          return res.status(400).json({
            success:false,
            message:error.message
          })
        }
    }

























/*exports.capturePayment=async(req,res)=>
    {
         const{coursesId}=req.body;
          const userId=req.user.id;

          if(!coursesId.length===0)
            {
                return res.status(404).json({
                    success:false,
                    message:"Please provide  course Id"
                })
            }
           let totalAmount=0;
           
            for(const courseId of coursesId)
            {
            try
            {
             let courseDetails=await Course.findById(courseId);
             if(!courseDetails)
                {
                    return res.status(404).json({
                        success:false,
                        message:"Unable to find the course"
                    })
                }
                const uid = mongoose.Types.ObjectId.createFromHexString(userId)

                if(courseDetails.studentsEnrolled.includes(uid))
                    {
                        return res.status(400).json({
                            success:false,
                            message:"Student is already enrolled"
                        })
                    }

            totalAmount+=courseDetails.price;
            
           }catch(error)
           {
                console.error(error);

                return res.status(500).json({
                    success:false,
                    message:error.message
                })
           }
        }


          
           const currency="INR";
           const options={
            amount:totalAmount*100,
            currency,
            receipt:Math.random(Date.now()).toString,
            notes:{
                courseId:course._id,
                userId
            }
           }
          
           try{
               //Possibility of Error
            const paymentResponse=await instance.orders.create(options);

            console.log("Payment Response",paymentResponse)


            return res.status(200).json({
                success:true,
                courseName:courseDetails.courseName,
                courseDescription:courseDetails.courseDescription,
                thumbnail:courseDetails.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            })


           }catch(error)
           {
              console.error(error);

              return res.status(500).json({
                success:false,
                message:"Could not initiate order"
              })
           }

    };


exports.verifyPayment=async(req,res)=>
    {
        const webhookSecret="12345678";

        const signature=req.header["x-razorpay-signature"];
        const courses = req.body?.courses

        const userId = req.user.id
      

          
        // Hmac-Hashed based message authentication code

        const shasum=crypto.createHmac("sha256",webhookSecret);

        shasum.update(JSON.stringify(req.body));

        const digest=shasum.digest("hex");


        if(signature===digest)
            {
                console.log("Payment is Authorised");
               await enrollStudents(courses,userId,res);

                const{userId,courseId}=req.body.payload.payment.entity.notes;

                try
                {
                   const enrolledCourse= await Course.findByIdAndUpdate(courseId,
                        {
                            $push:
                            {
                                studentsEnrolled:userId
                            }
                        },
                        {new:true}
                      )
                      if(!enrolledCourse)
                        {
                            return res.status(500).json({
                                success:false,
                                message:"Course not found"
                            })
                        }

                    console.log("Enrolled Course");

                 const enrolledStudent = await User.findByIdAndUpdate(userId,
                        {
                            $push:
                            {
                                courses:courseId
                            }
                        },
                        {new:true}
                      )

                      console.log("Enrolled Student",enrolledStudent);
                    const studentName=enrolledStudent.firstName+" "+enrolledStudent.lastName;
                  const emailResponse=await mailSender(enrolledStudent.email,
                        courseEnrollmentEmail(enrolledCourse.name,studentName)
                    )

                   console.log("Email Response",emailResponse);

                   return res.status(200).json({
                    success:true,
                    message:"Signature Verified"
                   })
            }
            

            

         return res.status(400).json({
            success:false,
            message:"Invalid request"
         })
    }






    const enrollStudents = async (courses, userId, res) => {
        if (!courses || !userId) {
          return res
            .status(400)
            .json({ success: false, message: "Please Provide Course ID and User ID" })
        }
      
        for (const courseId of courses) {
          try {
            // Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
              { _id: courseId },
              { $push: { studentsEnroled: userId } },
              { new: true }
            )
      
            if (!enrolledCourse) {
              return res
                .status(500)
                .json({ success: false, error: "Course not found" })
            }
            console.log("Updated course: ", enrolledCourse)
      
            const courseProgress = await CourseProgress.create({
              courseID: courseId,
              userId: userId,
              completedVideos: [],
            })
            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
              userId,
              {
                $push: {
                  courses: courseId,
                  courseProgress: courseProgress._id,
                },
              },
              { new: true }
            )
      
            console.log("Enrolled student: ", enrolledStudent)
            // Send an email notification to the enrolled student
            const emailResponse = await mailSender(
              enrolledStudent.email,
              `Successfully Enrolled into ${enrolledCourse.courseName}`,
              courseEnrollmentEmail(
                enrolledCourse.courseName,
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
              )
            )
      
            console.log("Email sent successfully: ", emailResponse.response)
          } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
          }
        }
}*/


