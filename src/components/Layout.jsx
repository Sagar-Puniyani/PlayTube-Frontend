import { Navbar, Sidebar } from "../components";
import { Outlet } from "react-router-dom";

 const Layout = () => {
  return (
    <>
     <div className="">
     <Navbar />
      <Sidebar />
      <div className="w-full  sm:w-[80%] lg:w-[88%] xl:w-[83%] 3xl:w-[85%] sm:ml-[123px] xl:ml-[212px] md:pl-[10px]  mb-[80px] ">
        <Outlet />
      </div>
     </div>
    </>
  );
};


export default Layout
