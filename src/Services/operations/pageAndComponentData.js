import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async (categoryId) => {

    
  let result=[];
  const toastId=toast.loading("Loading...")

  try
  {
        
    const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,
        {categoryId:categoryId}
    );

    if(!response.data.success)
        {
            throw new Error(response.data.message);
        }
        
         result=response?.data;
         
        
  }catch(error)
  {
      toast.error(error.message)
      result=error.response?.data
  }

  toast.dismiss(toastId);

  return result;
}

