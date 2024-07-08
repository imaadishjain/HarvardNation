const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const optGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");

const {passwordUpdated} = require("../mail/templates/passwordUpdate");

require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({email});
    if (checkUserPresent) {
      return res.status(200).json({
        success: false,
        message: "User is already registered",
      });
    }
  
    let otp = optGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    var result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = optGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.find({ otp: otp });
    }

    console.log("Otp Generated", otp);

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP send successfully",
      otpPayload,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send otp",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password doesnot match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already exist.Please SignIn to continue",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

   

    if (recentOtp.length === 0) {
      return res.status(200).json({
        success: false,
        message: "OTP not found",
      });
    } 
    else if (recentOtp[0].otp!==otp) {
     
      return res.status(200).json({
        success: false,
        message: "Invalid OTP",
      });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    
    const user=await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
    })

    return res.status(200).json({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
  
    return res.status(400).json({
      success: false,
      message: "User cannot be registered Please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(403).json({
        success: true,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      }
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:"24h"
      });

      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() +   1000*60*60*3*24),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failure please try again",
    });
  }
};

// change password

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userDetails = await User.findById(req.user.id);

    const isPasswordMatch=await bcrypt.compare(oldPassword,userDetails.password)
   
    if(!isPasswordMatch)
      {
         return res.status(200).json(
         {
          success:false,
          message:"Current Password Not matched"
         }
        )
      }
   
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      
      const updatedUserDetails = await User.findOneAndUpdate(
        {_id:req.user.id},
        { password: encryptedPassword },
        { new: true }
      )
      
    
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password of your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            
          )
        );
        console.log("Email sent successfully:", emailResponse.response);
        return res.status(200).json({
          success:true
        })
      } catch (error) {
        console.error("Error occurred while sending email:", error);

        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        });
      }
    }
   catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to change the password, please try again later",
    });
  }
};
