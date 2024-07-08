
const mongoose=require("mongoose");

const mailSender=require("../utils/mailSender");

const emailVerificationTemplate=require("../mail/templates/emailVerificationTemplate.js")

const otpSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
    }
});

async function sendVerificationEmail(email,otp)  
  { 
           try{

            const mailRespone=await mailSender(email,
             "Verification Mail",emailVerificationTemplate(otp));
            console.log("Email Send Successfully")

           }
           catch(error){
            console.log("Error Occured while sending mail")
            console.error(error);
           }
  }

  otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next(); 
  })



module.exports=mongoose.model("OTP",otpSchema)



