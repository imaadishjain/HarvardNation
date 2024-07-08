const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
   
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status.json({
        success: false,
        message: "Token is missing",
      });
    }
  
    try {
      
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decode Data",decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went worn while validatin the token",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
 
    const role = req.body;

    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for student",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
  
    const role = req.body;

    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for instructor",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const role = req.body;

    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for admin",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
