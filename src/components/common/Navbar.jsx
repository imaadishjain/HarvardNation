import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/HarvardNation for Navbar.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../Services/apiconnector'
import { categories } from '../../Services/apis'
import { useState} from 'react'
import { BsChevronDown } from "react-icons/bs"
import { matchPath } from 'react-router-dom'
import { setToken } from '../../slices/authSlice'
import { GiConsoleController } from 'react-icons/gi'






const Navbar = () => {
 

   
   const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
       const{totalItems}=useSelector((state)=>state.cart)
   
    const location=useLocation();

     const [subLinks,setSubLinks]=useState([])
     const[loading,setLoading]=useState(false);

    const fetchSublinks=async()=>
        {
            setLoading(true)
            
            try{
                  
                const result=await apiConnector("GET",categories.CATEGORIES_API)
                   
                console.log("Result",result.data.data);
                    setSubLinks(result.data.data);
               

            }
            catch(error)
            {
                console.log("Error",error)
                console.log("Could not fetch category list");
            }
            setLoading(false)
        }

    useEffect(()=>
    {
        fetchSublinks();
    },[])
    const matchRoute=(route)=> {
     
        return matchPath({ path: route }, location.pathname)
      }

  return (
    <div >
       <div className={` fixed w-full z-10 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
    location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
  } transition-all duration-200`}>
   

    <div className="flex w-11/12 max-w-maxContent items-center justify-between">

    <Link  to="/">
     <img src={logo}
        width="200"
        height={"400"}
        loading='lazy'
        alt=""
        
        
     />
    </Link>

    <nav className='md:block hidden'>
      <ul className="flex gap-x-6 text-richblack-25">
        {
            NavbarLinks.map((link,index)=>
            {
                return (
                    <li key={index}>
                        {
                            link.title==="Catalog"?
                            (
                              <div className='relative group flex flex-row items-center gap-2'>
                                <p>{link.title}</p>
                                <BsChevronDown />

                                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                
                                 {
                                    loading ?(
                                        <p className="text-center">Loading...</p>)
                                    :(subLinks &&
                                     subLinks.length)?(
                                       
                                         subLinks.map((subLink,index)=>{

                                           return (<Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                               <p className='text-center mb-3 '>{subLink.name}</p>
                                            </Link>)
                                        })
                                        
                                        
                                    ):(<div></div>)
                                 }

                                </div>
                              </div>  
                            )
                            :(
                                <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`
                      }
                    >
                      {link.title}
                    </p>
                                </Link>
                            )
                        }
                    </li>
                )
            })
        }
      </ul>
    </nav>

    {/*Login Signup Dashboard */}
    <div className='flex gap-x-4 items-center'>
       
       {
        user && user.AccountType!=="Instructor" &&(
            <Link to="/dashboard/cart" className='relative'>
            <AiOutlineShoppingCart size={25} className='text-richblack-100'/>
            {
                totalItems>0 && (
                    <span className='absolute -bottom-2 left-[14px] text-xs font-bold h-5 w-5 items-center grid text-center rounded-full bg-richblack-600 text-yellow-100'>
                        {totalItems}
                    </span>
                )
            }
            </Link>
        )
       }
       {
         (token===null) && (
            <Link to="/login">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                text-richblack-100 rounded-md'>
                    Login
                </button>
            </Link>
         )
       }
       {
        (token===null) && (
            <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                text-richblack-100 rounded-md'>
                    SignUp
                </button>
            </Link>
        )
       }
       {
        token!==null && <ProfileDropDown/>
       }

    </div>


    </div>

  </div>
    </div>
  

  )
}

export default Navbar