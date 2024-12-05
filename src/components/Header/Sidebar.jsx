//todo set routes
import React from "react";
import {
  BiHistory,
  BiLike,
  CiSettings,
  HiOutlineVideoCamera,
  IoFolderOutline,
  RiHome6Line,
  TbUserCheck,
  IoMdLogOut,
  CgPlayList
} from "../icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/slice/authSlice.js";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth?.status);
  const username=useSelector((state)=>state.auth.userData?.username)

  const logout = async (e) => {
    e.stopPropagation();
    const response = await dispatch(userLogout());

    if (response.type === "logout/fulfilled") {
      navigate("/");
    }
  };

  const sidebarTopItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiLike size={25} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <HiOutlineVideoCamera size={25} />,
      title: "My Content",
      url: `/channel/${username}`,
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
    {
      icon:<CgPlayList size={25}/>,
      title:"Playlists",
      url:"/playlists"
    }
  ];

  const bottomBarItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  return (
    <>
      <div
        id="Sidebar-container"
        className="hidden sm:block border-r border-slate-600 w-[121.7px] xl:w-[220px]   fixed h-screen pt-5 pl-3 pr-3 "
      >
        <div id="item-container" className="w-full text-white">
          {sidebarTopItems.map((item) => (
            <NavLink
              to={item.url}
              key={item.title}
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 xl:text-white xl:bg-red-500 xl:border xl:border-slate-600 flex flex-col items-center gap-2 xl:flex xl:flex-row w-full xl:items-center xl:gap-2 cursor-pointer py-1 px-2 mt-3 font-bold"
                  : "xl:border xl:border-slate-600 flex flex-col items-center gap-2 xl:flex xl:flex-row w-full xl:items-center xl:gap-2 cursor-pointer py-1 px-2 mt-3 hover:bg-red-500"
              }
            >
              {item.icon}
              <span className="text-[10px] text-center xl:text-base hidden md:block">
                {item.title}
              </span>
            </NavLink>
          ))}
        </div>
        <div className="space-y-4  w-full text-white xl:mt-[190px] mt-[10px]">
          <div className=" flex flex-col items-center  xl:flex xl:flex-row xl:items-center gap-2  xl:hover:bg-red-500 cursor-pointer py-1 px-2 xl:border xl:border-slate-600">
            <CiSettings size={25} />
            <span className="text-[10px] xl:text-base font-bold ">
              Settings
            </span>
          </div>

          {authStatus && (
            <div
              className=" flex flex-col items-center  xl:flex xl:flex-row xl:items-center gap-2  xl:hover:bg-red-500 cursor-pointer py-1 px-2 xl:border xl:border-slate-600"
              onClick={logout}
            >
              <IoMdLogOut size={25} />
              <span className="text-[10px] xl:text-base font-bold ">
                Logout
              </span>
            </div>
          )}
        </div>
      </div>

      {/* for mobile sidebar is bottom bar  */}
      <div className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F] ">
        {bottomBarItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) => (isActive ? "text-red-500" : "")}
          >
            <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
      
    </>
  );
};
