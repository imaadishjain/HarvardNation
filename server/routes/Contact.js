const express=require("express");
const router=express.Router();
const {contactUs}=require("../controllers/ContactUs")

router.post("/contact",contactUs);

module.exports=router;