import React from "react";
import Template from "../components/core/Auth/template";
import signupImg from "../assets/Images/signup.webp";

export default function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Join the millions learning to code with HarvardNation for free"
      desc1="Build skills for today,tommorow,and beyond."
      desc2="Education to future-proof your career"
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}
