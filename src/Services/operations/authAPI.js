import toast from "react-hot-toast";
import apis, { endpoints } from "../apis"

import {setToken,setLoading } from "../../slices/authSlice";

import  {setUser}  from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { useDispatch } from "react-redux";
import { resetCart } from "../../slices/cartSlice"



const {
  LOGIN_API,
  SIGNUP_API,
  OTP_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API}=endpoints


export function login(email, password,navigate) {
     
     return  async(dispatch)=>
      {
      const toastId = toast.loading("Loading...")
      
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
        
        console.log("LOGIN API RESPONSE............", response)
        console.log(response.data);
        if (!response.data.success) {
            toast.error(response.data.message)
           throw new Error(response.data.message)
        }
        else{
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        console.log(response.data);
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
        }
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function  sendOtp(email,navigate)
  {
    return async(dispatch)=>
      {
         const toastId=toast.loading("Loading....");
         dispatch(setLoading(true));
         try{

            const response=await apiConnector("POST",OTP_API,{email
            });
            console.log(response);
            if(!response.data.success)
              {
                throw new Error(response.data.message)
              }

              toast.success("OTP Sent Successfully")
              navigate("/verify-email")
         }
         catch(error)
         {
            toast.error(error.message);
         }
         dispatch(setLoading(false));
         toast.dismiss(toastId)
        
      }
  }



  export function signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate)
{
  return async(dispatch)=>
    {
           dispatch(setLoading(true))
           const toastId = toast.loading("Loading...");

           try{
               const response=await apiConnector("POST",SIGNUP_API,{
                 firstName,
                 lastName,
                 email,
                 password,
                 confirmPassword,
                 accountType,
                 otp
               })

                console.log("SignUp Resonse",response);
            if(!response.data.success)
              {
                
                throw new Error(response.data.message)
              }

              toast.success("SignUp Successfully")
              navigate("/login")
           }catch(error)
           {
             toast.error(error.message)
           }
         dispatch(setLoading(false));
         toast.dismiss(toastId)
    }
}

export  function logout(navigate)
{
    return (dispatch)=>
    {
       
        dispatch(setLoading(true));
        const toastId=toast.loading("Loading...")
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        navigate("/")
        toast.success("Logout Successfully")
    }
}

export const getPasswordResetToken=(email,path,setEmailSent)=>
  {
       return async(dispatch)=>
        {
            dispatch(setLoading(true));
            const toastId=toast.loading("Loading...");
            try
            {
              const response=await apiConnector("POST",RESETPASSTOKEN_API,
                {
                  email,
                  path
                }
              )
              if(!response.data.success)
                {
                  throw new Error(response.data.message);
                }

                toast.success("Reset Email Sent Successfully");

                setEmailSent(true);
            }
            catch(error)
            {
              
               toast.error(error.message);
                
            }
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
  }

  export const resetPassword=(password,confirmPassword,token,navigate)=>
  {
      return async(dispatch)=>
      {
           dispatch(setLoading(true));
           const toastId=toast.loading("Loading..");
           try
           {
              console.log("Token",token);
               const response=await apiConnector("POST",RESETPASSWORD_API,{
                password,
                confirmPassword,
                token,
               })
               if(!response.data.success)
                {
                  throw new Error(response.data.message)
                }

                toast.success("Password reset successfully")
                navigate("/login")

           }catch(error)
           {

            toast.error(error.message)

           }

           dispatch(setLoading(false));
           toast.dismiss(toastId)
      }
  } 


