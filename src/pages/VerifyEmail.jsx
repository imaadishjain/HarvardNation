import React from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signup } from '../Services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";


const VerifyEmail = () => {

    const {loading,signupData}=useSelector((state)=>state.auth);

    const[otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>
    {
        console.log("Im inside the verify email")
          if(!signupData)
            {
                navigate("/signup")
            }
            
    },[])
   
    const handleOnSubmit=(event)=>
        {
            event.preventDefault();
            const{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType
            }=signupData

            dispatch(signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate))


        }




  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
      <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        {
            loading ?
            (<div className='spinner'></div>)
            :
            (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verfiy Email</h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code have been sent to you</p>
                    <form onSubmit={handleOnSubmit}>
                    <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
                        <button type="submit"
                        className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                            Verfiy Email
                        </button>
                    </form>

                   <div className="mt-6 flex items-center justify-between">
                    <Link to="/login">
                    <p className="text-richblack-5 flex items-center gap-x-2">
                     <BiArrowBack /> Back To Signup
                   </p>
                    </Link> 
                    <div className='text-yellow-50'>
                        {seconds > 0 || minutes > 0 ? (
                      <p>
                        {minutes < 10 ? `0${minutes}` : minutes}:
                         {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                          ) : (
                    <p>Didn't recieve code?</p>
                     )}
                     </div>

                 <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}
                   className="flex items-center text-blue-100 gap-x-2">
                    <RxCountdownTimer />
                    Resend it
                 </button>
                 </div>


                </div>


            )
        }
      </div>
  )
}

export default VerifyEmail