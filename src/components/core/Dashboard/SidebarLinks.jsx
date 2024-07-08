import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SidebarLinks = ({link,iconName}) => {
    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();

    const matchRoute=(route)=>
        {
            return matchPath({path:route},location.pathname)
        }
     
  return (
    <NavLink
     to={link.path}
     className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)?"bg-yellow-800 text-yellow-50":"bg-opactiy-0 text-richblack-500"} 
     transition-all duration-200`}
     >
      <span className={`${matchRoute(link.path)?"":"hidden"} 
      absolute left-0 top-0  w-[0.20rem] h-full bg-yellow-5`}></span>


      <div className='flex items-center gap-x-2'>

       <Icon className="text-lg"/>
       <span>{link.name}</span>

      </div>


    </NavLink>
  )
}

export default SidebarLinks