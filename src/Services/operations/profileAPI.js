import { profileEndPoints } from "../apis";
import toast from "react-hot-toast";

import { apiConnector } from "../apiconnector";

const { GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DATA_API } = profileEndPoints;

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading..");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.success);
    }

    result = response.data.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
}


export async function getInstructorData(token)
{ 
    const toastId=toast.loading("Loading..");
     
    let result=[];
   
    
    try{

      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API,null,
        {
          Authorization: `Bearer ${token}`,
        })
    

      console.log("GET_INSTRUCTOR_API_RESPONSE",response);
      
      result=response?.data?.data;

    }catch(error)
    {
      console.log("GET_INSTRUCTOR_API Error",error)
      toast.error(error.message);
    }

    toast.dismiss(toastId);

    return result;

}