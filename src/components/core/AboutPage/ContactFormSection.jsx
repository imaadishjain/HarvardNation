 import React from 'react'
 import ContactUsForm from '../../ContactPage/ContactUsForm'
 const ContactFormSection = ({text,description}) => {
   return (
     <div className="mx-auto">

        <h1 className="text-center lg-w-[600px] text-white text-4xl font-semibold">{text}</h1>
        <p className="text-center  text-richblack-300 mt-3">{description}</p>
        
        <div className="mt-12 mx-auto">
            <ContactUsForm/>
        </div>
     </div>
   )
 }
 
 export default ContactFormSection