import toast from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const fetchCourseDetails = async (courseId) => {
  
  const toastId = toast.loading("Loading...");
  let result = null;
  try {

    const response = await apiConnector("POST", COURSE_DETAILS_API,{
      courseId
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const fetchCourseCategories = async () => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const addCourseDetails = async (data, token) => {
  console.log("Data", data);
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Course Details Added Successfully");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const editCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Course Details Added Successfully")
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Section Created Successfully");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Lecture Created");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    console.log("Result",result);
    toast.success("Sub Section Updated Successfully");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const deletSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Course Section Deleted");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const deletSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Lecture Deleted");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const fetchInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Course Deleted Successfully");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const getFullCourseDetails = async (courseId, token) => {


 
  const toastId = toast.loading("Loading...");
   
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
       GET_FULL_COURSE_DETAILS_AUTHENTICATED,
       {
       courseId,
       },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const markLectureAsCompleted = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Resonse",response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data;
    toast.success("Lecture Completed");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Rating Created");
    result = true;
  } catch (error) {
    result = false;
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};
