import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index"
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Setting from "./components/core/Dashboard/Settings/index"
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/index"
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Instructor from "./components/core/Dashboard/IntructorDashboard/Instructor";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import toast from "react-hot-toast";
import { useEffect } from "react";
const App = () => {
  const width = window.innerWidth;
  useEffect(()=>
    {
     
     if(width<1035)
     {

      toast.error("Designing of the website is done under the consideration of Full screen")
          
     }
      
    },[width])

   const {user}=useSelector((state)=>state.profile);
  return (
    <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
   
      <div>
      <Navbar />
      </div>
 

    <div className="mt-[52px]">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
         
         element={
           <PrivateRoute>
             <Dashboard />
           </PrivateRoute>
         }
         >
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/Settings" element={<Setting/>}/>

          { 
            user?.accountType===ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
            <Route path="/dashboard/cart" element={<Cart/>}/>
            </>
            )
          }

          {
            user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course"  element={<AddCourse/>}/>
              <Route path="dashboard/my-courses"  element={<MyCourses/>}/>
              <Route path="dashboard/instructor"  element={<Instructor/>}/>
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
            </>
            )
          }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
        {
          user?.accountType===ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              />
            </>
          )
        }


        </Route>

      
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
     </div>
    
   
  );
};

export default App;
