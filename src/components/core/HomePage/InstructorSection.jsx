import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 items-center">
        <div className="w-[50%]">
          <img
            src={Instructor}
            alt="Instructor image"
            className="shadow-[-15px_-14px_0px_4px_rgba(255,255,255)]"
          />
        </div>

        <div className="w-[50%] flex flex-col gap-10 ">
          <div className="text-4xl  font-semibold w-[50%]">
            Become an
            <HighlightText text={" Instructor"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            HarvardNation. We provide the tools and skills to teach what you
            love.
          </p>

          <div className="w-fit items-center">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
