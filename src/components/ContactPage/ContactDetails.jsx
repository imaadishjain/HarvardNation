import React from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { FcCallback } from "react-icons/fc";

const contactDetails = [
  {
    icon: <HiMiniChatBubbleLeftRight size={25} />,
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@harvardNation.com",
  },

  {
    icon: <BsGlobeCentralSouthAsia size={25} />,
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: <FcCallback size={25} />,
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetails = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
        {contactDetails.map((element, index) => {
          return (
            <div className="p-3">
              <div key={index} className="flex flex-col text-richblack-50 ">
                <div className="flex flex-row gap-2 text-richblack-300  ">
                  {element.icon}
                  <header className="font-bold text-richblack-5 text-xl">
                    {element.heading}
                  </header>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-richblack-300 text-sm">{element.description}</p>
                  <p className="text-richblack-200 text-sm font-bold">{element.details}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactDetails;
