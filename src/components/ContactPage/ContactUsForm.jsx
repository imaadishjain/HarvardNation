import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../Services/apiconnector.js";
import { contactusEndpoint } from "../../Services/apis";
import toast from "react-hot-toast";
import countryCode from "../../data/countrycode.json";

const ContactUsForm = ({ text }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessfull },
  } = useForm();

  const submitContactForm = async (data) => {
 console.log("Logging Data", data);
    try {
      setLoading(true);
       const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,
                    {
                        firstName:data.firstName,
                        lastName:data.lastName,
                        email:data.email,
                        phoneNo:data.phoneNo,
                        countrycode:data.countrycode,
                        message:data.message
                    })
                
                    if(!response.data.success)
                        {
                            throw new Error(response.data.message)
                        }

      toast.success("Response Send Successfully");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessfull) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessfull]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-[250px]">
        <div className="spinner"></div>
        </div>
        
      ) : 
      (
        <form  className="flex flex-col gap-7"
          onSubmit={handleSubmit(submitContactForm)}
        >
          <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
              
                <label htmlFor="firstName" className="lable-style">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter Your First Name"
                   className="form-style"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <span className="text-white">Please Enter Your First Name</span>}
              
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="lable-style">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Your Last Name"
                   className="form-style"
                  {...register("lastName")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="lable-style">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                 className="form-style"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Please Enter Your Email Address</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="lable-style">Phone Number</label>

            
              <div className="flex gap-5">
              <div className="flex w-[81px] flex-col gap-2">
                  <select
                    name="dropdown"
                    id="dropdown"
                    className="form-style"
                    {...register("countrycode", { required: true })}
                  >
                    {countryCode.map((data, index) => {
                      return (
                        <option key={index} value={data.code}>
                          {data.code}-{data.country}
                        </option>
                      );
                    })}
                  </select>
                   </div>
                   
                   <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                  <input
                
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                     className="form-style"
                    {...register("phoneNo", {
                      required: {
                        value: true,
                        message: "Please Enter Phone Number",
                      },
                      maxLength: { value: 10, message: "Invalid Phone Number" },
                      minLength: { value: 8, message: "Invalid Phone Number" },
                    })}
                  />
                    {errors.phoneNo && <span className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNo.message}</span>}
                
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="lable-style">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="7"
                placeholder="Enter Your Message Here"
                className="form-style"
                {...register("message", { required: true })}
              />
              {errors.message && <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Message</span>}
            </div>

            <button
              type="submit"
              className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
              ${
                 !loading &&
                 "transition-all duration-200 hover:scale-95 hover:shadow-none"
                 }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
              Send Message
            </button>
        
        </form>
      )
      }
    </div>
  );
};

export default ContactUsForm;
