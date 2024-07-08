import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import { ReviewSlider } from "../components/common/ReviewSlider";

import CodeBlocks from "../components/core/HomePage/CodeBlocks";


const Home = () => {
  return (
    <div>
      <div
        className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white"
      >
        <Link to={"/signup"}>
          <div
           className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none"
          >
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Became an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
           className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            {" "}
            <source src={Banner} type="video/mp4"></source>
          </video>
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row flex flex-col "}
            heading={
              <div  className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" Coding Potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a>\n<a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div  className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={" Coding In Second"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-white"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a>\n<a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          />
        </div>

        <ExploreMore />
      </div>

      {/*Section 2*/}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catlog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex flex-row items-center gap-3">
                  Learn
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the Skills you need a{" "}
              <HighlightText text={"job that is in demand"} />
            </div>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
            <div className="text-[16px]">
                The modern HarvardNation is the dictates its own terms. Today,
                to be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      <div
       className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white"
      >
        <InstructorSection />
         
       
           
         <h2 className="text-center text-4xl font-semibold mt-8">
          Review from other learner
           </h2>
         
        
              
        <div className="w-[0px]  md:w-full">
        <ReviewSlider/>
        </div>
      
      </div>

      <Footer />
    </div>
  );
};

export default Home;
