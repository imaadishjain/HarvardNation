import { settingsEndpoints } from "../apis";
import toast from "react-hot-toast";

import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      );

      toast.success("Profile Info Update SuccessFully");
    } catch (error) {
      toast.error("Could not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export function changePassword(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Updated Successfully");
    } catch (error) {
      console.log("Error", error.messsage);
      toast.error(error.message);
    }

    toast.dismiss(toastId);
  };
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account Deleted Successfully");
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log("Error", error.message);

      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };
}
