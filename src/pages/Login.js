import React from 'react'
import Template from '../components/core/Auth/template'
import loginImg from '../assets/Images/login.webp'

export default function Login({setIsLoggedIn}) {  
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tommorow, and beyond."
      desc2="Education to future-proof your career"
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}
