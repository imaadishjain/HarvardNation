const mongoose=require("mongoose");
const Category = require("./Category");



const courseSchema=new  mongoose.Schema({
 

   courseName:{
    type:String,
   },
   courseDescription:{
    type:String,
   },
   instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },

   whatYouWillLearn:{
    type:String
   },

  courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
   }],
   
  ratingAndReviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingandReview"
    }
  ],

  price:{
    type:Number
  },

  thumbnail:{
    type:String,
  },

  tag:{
    type:[String],
    required:true, 
  },

  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },

  studentsEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  }],
   instruction:{
    type:[String],
   },
  status:{
    type:String,
    enum:["Draft","Published"],
  }
  
});
courseSchema.set('timestamps',true);

module.exports=mongoose.model("Course",courseSchema)