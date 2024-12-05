import React from "react";
import ChannelHeader from "../components/Channel/ChannelHeader";
import { useSelector } from "react-redux";
import { Loader } from "../components";
import ChannelNavigate from "../components/Channel/ChannelNavigate";
import { Outlet } from "react-router-dom";

const EditChannel = () => {
  const channel = useSelector((state) => state?.auth?.userData);
  const loading = useSelector((state) => state?.auth?.updating);
  return (
    <>
      {loading && (
        <div className="w-full fixed top-20 flex justify-center z-20">
          <div className="w-52 border border-slate-600 bg-black flex gap-2 items-center p-3 ">
            <Loader />
            <span className="text-md font-bold text-white">Updating...</span>
          </div>
        </div>
      )}
      <ChannelHeader
        avatar={channel?.avatar}
        coverImage={channel?.coverImage}
        username={channel?.username}
        fullname={channel?.fullname}
        edit={true}
      />
      <ChannelNavigate edit={true} />
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
};

export default EditChannel;
