import  { useState } from "react";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Link, NavLink,useNavigate} from "react-router-dom";
import { Search } from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/slice/authSlice.js";
import {
  CiSearch,
  SlMenu,
  IoCloseCircleOutline,
  BiLike,
  HiOutlineVideoCamera,
  IoMdLogOut,
  CgPlayList
} from "../icons";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const authStatus = useSelector((state) => state.auth?.status);
  const userAvatar = useSelector((state) => state.auth?.userData?.avatar);
  const username=useSelector((state)=>state.auth?.userData?.username);
  const [ToggleMenu, setToggleMenu] = useState(false);
  const [ToggleSearch, SetToggleSearch] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setToggleMenu((prev) => !prev);
  };
  const handleLogout = async(e) => {
    e.stopPropagation();
   const response = await dispatch(userLogout());
   if(response.type==="logout/fulfilled"){
    navigate("/")
   }
  };
  return (
    <>
      <nav
        id="nav-container"
        className="border-b-2 border-gray-500 flex justify-between h-20 items-center pl-3  pr-3 w-full sticky top-0 bg-[#0F0F0F] z-20"
      >
        <div id="nav-logo">
          <Logo />
        </div>

        {/* search for large screen  */}
        <div
          id="search-bar"
          className="w-[35%] border border-slate-600 hidden sm:block"
        >
          {/* <input type='text' placeholder='Search' className='w-full px-2 py-2 bg-[#0E0F0F] outline-none focus:bg-[#222222] text-white' /> */}
          <Search />
        </div>

        {/* login and signup butons for larger screens */}
        {authStatus ? (
         <NavLink to={`/channel/${username}`}>
         <div className="rounded-full sm:block hidden">
            <img
              src={userAvatar}
              alt="Avatar"
              className="rounded-full h-10 w-10 object-cover"
            />
          </div>
         </NavLink>
        ) : (
          <div id="button-containers" className="text-white  hidden sm:block ">
            <div className="w-full flex flex-row gap-2 ">
              <Link to="/login">
                <Button
                  className="h-[50px] border border-slate-500 w-[100px]  p-2 hover:scale-110 duration-100 ease-in hover:bg-[#0F0F0F]"
                  bgColor="bg-[#222222]"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="h-[50px] border border-slate-500 w-[100px]  p-2 hover:scale-110 duration-100 ease-in hover:bg-[#222222]"
                  bgColor="bg-[#0F0F0F]"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* hamburger and search icon for small screen */}
        <div className="block sm:hidden">
          <div className="text-white font-bold cursor-pointer flex gap-4 items-center">
            <CiSearch size={30} fontWeight={"bold"} onClick={(e)=>{e.stopPropagation()
            SetToggleSearch((prev)=>!prev)}}/>
            <SlMenu size={24} fontWeight={"bold"} onClick={handleClick} />
          </div>
        </div>
      </nav>

      {/* navbar for smaller screen */}
      <div
        className={` fixed top-0 right-0 h-screen w-[70%] sm:hidden bg-[#0F0F0F] border-l rounded-lg  transition-all duration-300 z-20 ${
          ToggleMenu ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <nav className="text-white border-b w-full pt-6 pb-6 flex items-center justify-between p-2">
          <div id="nav-logo">
            <Logo />
          </div>
          <IoCloseCircleOutline
            size={35}
            className="cursor-pointer"
            onClick={handleClick}
          />
        </nav>

        <div className=" h-[65%] pt-5 pb-5 p-3 flex flex-col  justify-between">
          {/* header of toggle bar */}
          <div className="  text-white  flex flex-col space-y-7">
            <NavLink
              to="/liked-videos"
              className={({ isActive }) =>
                `${
                  isActive ? "text-red-500" : ""
                } flex flex-row items-center border border-slate-600 p-3`
              }
            >
              <BiLike size={25} />
              <span className="text-[16px] ml-4">Liked Videos</span>
            </NavLink>
            <NavLink
              to={`/channel/${username}`}
              className={({ isActive }) =>
                `${
                  isActive ? "text-red-500" : ""
                } flex flex-row items-center border border-slate-600 p-3`
              }
            >
              <HiOutlineVideoCamera size={25} />
              <span className="text-[16px] ml-4">My Content</span>
            </NavLink>
            <NavLink
              to="/playlists"
              className={({ isActive }) =>
                `${
                  isActive ? "text-red-500" : ""
                } flex flex-row items-center border border-slate-600 p-3`
              }>
                <CgPlayList size={25} />
                <span className="text-[16px] ml-4">Playlists</span>

            </NavLink>
          </div>

          {/* body of toggle bar */}
          {!authStatus ? (
            <div className="  text-white  flex flex-col space-y-7  ">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-red-500" : ""
                  }  border border-slate-600 flex flex-row justify-center p-3 bg-[#222222]`
                }
              >
                <span className="text-[16px] ">Login</span>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-red-500" : ""
                  }  border border-slate-600 flex flex-row justify-center p-3`
                }
              >
                <span className="text-[16px] ">Sign Up</span>
              </NavLink>
            </div>
          ) : (
            <div
              className="border border-slate-600 flex flex-row justify-center p-3 text-white cursor-pointer"
              onClick={handleLogout}
            >
              <IoMdLogOut size={25} />
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>

      {/* search bar for smaller screen */}
     
      <div className={`fixed top-0 w-full h-screen  sm:hidden backdrop-blur-sm pt-12 pl-3 transition-all duration-300 z-20 ${
      ToggleSearch?"-translate-y-0":"-translate-y-full"}`}>
        <div className=" w-[70%]  h-[46px]">
          <Search button="true"></Search>
        </div>
        <div className="text-white fixed top-3 right-10 cursor-pointer" onClick={(e)=>{e.stopPropagation() 
        SetToggleSearch((prev)=>!prev)}}>
          <IoCloseCircleOutline size={25}/>
        </div>
       
      </div>
     
    </>
  );
};
