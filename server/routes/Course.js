// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  getCategoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

const {
  updateCourseProgress
} = require("../controllers/CourseProgress");


const{auth,isStudent,isInstructor,isAdmin}=require("../middlewares/auth");



router.post("/createCourse",auth,isInstructor,createCourse);


router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);


router.post("/addSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);


router.get("/getAllCourses",getAllCourses);
router.post("/getCourseDetails",getCourseDetails);
router.post("/getFullCourseDetails",auth,getFullCourseDetails);

router.post("/editCourse",auth,isInstructor,editCourse);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.post("/deleteCourse",auth,isInstructor,deleteCourse);




router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);

router.post("/getCategoryPageDetails",getCategoryPageDetails);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRating)




module.exports=router;
