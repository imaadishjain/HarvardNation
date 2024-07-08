const mailSender=require("../utils/mailSender");

const {contactUserEmail}=require("../mail/templates/contactFormRes");
const {contactOwnerEmail}=require("../mail/templates/ownerContactUsForm");

require("dotenv").config();

exports.contactUs=async(req,res)=>
    {
      
         console.log(typeof(contactFormEmail));
        try{
            const{firstName,lastName,email,phoneNo,message,countrycode}=req.body;

            
           if(!firstName ||!lastName || !email || !phoneNo || !message)
            {
                return res.status(200).json({
                    success:false,
                    message:"All fields are required"
                })
             }

           await mailSender(email,"Your Data Sent SuccessFully",
            contactUserEmail(email, firstName, lastName, message, phoneNo, countrycode)
          ) 
       
          const emailResponseToOwner=await mailSender(process.env.OWNER_EMAIL,"Query Generated",
            contactOwnerEmail(
                email,
                firstName,
                lastName,
                message,
                phoneNo,
                countrycode
            )
          );


          return res.status(200).json({
            success:true,
            message:"Email Send Successfully"
          });


        }
        catch(error)
        {
          console.log("Error",error.message);
            return res.status(500).json({
                success:false,
                message:error.message
              });
        }
        



        
    }