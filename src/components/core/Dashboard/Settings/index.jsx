import React from 'react'
import ChangeProfilePicture from "./ChangeProfilePicture"
import UpdatePassword from './UpdatePassword'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'

export default function Setting(){
  return (
    <>
     <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
     Edit Profile</h1>
      
      <ChangeProfilePicture/>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </>
  )
}

