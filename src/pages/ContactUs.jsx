import React from "react";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import ContactDetails from "../components/ContactPage/ContactDetails";
import Footer from "../components/common/Footer";
import { ReviewSlider } from "../components/common/ReviewSlider";

const ContactUs = () => {
  return (
    <div className="mt-[80px]">

     <div>
     <div className="flex  w-11/12 max-w-maxContent mx-auto flex-col lg:flex-row">
        <div className="lg:w-[40%]  -mt-[0.95px] lg:mr-[50px] mb-[50px] ">
          <ContactDetails />
        </div>

        <div className=" rounded-[10px] border border-richblack-50 p-10">
          <div>
            <ContactFormSection
              text={"Got a Idea? We've got the skills. Let's team up"}
              description={
                "Tell us more about yourself and what you're got in mind."
              }
            />
          </div>
        </div>
      </div>

      <div className="text-white h-[150px]">
       <ReviewSlider/>
      </div>
     </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
