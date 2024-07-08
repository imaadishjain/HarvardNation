
const User=require("../models/User");
const  mailSender=require("../utils/mailSender");

const bcrypt=require("bcrypt");
const crypto=require("crypto");




exports.resetPasswordToken=async(req,res)=>
    {
        try{

        const email=req.body.email; 
        const path=req.body.path;
        
        const user = await User.findOne({email})
          
        if(!user)
        {
            return res.json({
                success:false,
                message:`Your email ${email} is not registered with us.Please enter the valid email`
            })
        }

        const token=crypto.randomBytes(20).toString("hex");
        
       const updatedDetails=await User.findOneAndUpdate({email:email},
                                                         {
                                                            token:token,
                                                            resetPasswordExpires:Date.now()+5*60*1000
                                                         },{new:true});

        console.log("Updated Deatils",updatedDetails);
        console.log("Path at backend",path);
        const  Url=`${path}/update-password/${token}`;

        await mailSender(email,"Reset Password Link",`Password Reset Link:${Url} .Please click on this URL to reset your password`);


        return res.status(200).json({
            success:true,
            message:"Email send successfully,please check your email"
        })
       }catch(error)
       {
        return res.status(500).json({
            success:false,
            message:"Failed to reset the password",
            error:error.message
        })
       }

    }


       



exports.resetPassword=async(req,res)=>
    {
        try{
           
            const {password,confirmPassword,token}=req.body;

            if(password!==confirmPassword)
                {
                    return res.json({
                        success:false,
                        message:"Password not matching"
                    })
                }

            const userDetails=await User.findOne({token:token});

            if(!userDetails)
            { 
               return res.json({
                success:false,
                message:"Invalid token"
               });
            }


            if(userDetails.resetPasswordExpires<Date.now())
                {
                     return res.json({
                        success:false,
                        message:"Token is expired,Please regenerate your token"
                     })
                }

            const hashedPassword=await bcrypt.hash(password,10);


            await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});

            return res.json({
                success:true,
                message:"Password Reset Successfull"
            })

        }
        catch(error)
        {
          return res.json({
            success:false,
            message:"Failed to reset the password",
            error:error.message
          })
        }
    }