import React, { useEffect, useState } from "react";
import { VideoCard } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../../store/slice/videoSlice.js";
import NoVideosFound from "../../components/NoVideosFound";
import { useLocation } from "react-router-dom";
import SubscriptionsSkeleton from "../../skeletons/SubscriptionsSkeleton";

const ChannelVideos = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const [searchParams, setSearchParams] = useState({sortBy:"createdAt",sortType:"desc"});
  const [activeButton, setActiveButton] = useState("button1");

  useEffect(() => {
    const sortBy = searchParams?.sortBy;
    const sortType = searchParams?.sortType;
    if(userId){
      dispatch(getAllVideos({ userId, sortBy, sortType }));
    }

    return () => dispatch(makeVideosNull());
  }, [dispatch, userId, searchParams]);
  if (loading) {
    return <SubscriptionsSkeleton />;
  }

  if (videos && videos?.length == 0) {
    return <NoVideosFound text="There are no videos available here" />;
  }

  const handleSort = (sortBy, sortType = "asc") => {
    setSearchParams({ sortBy, sortType });
  };

  return (
    <>
      {/* For sorting latest, popular and oldest videos */}
      <div className="w-full p-2 text-white flex gap-4">
        <button
          onClick={() => {
            setActiveButton("button1");
            handleSort("createdAt", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button1" ? "bg-red-500" : "bg-[#222222]"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => {
            setActiveButton("button2");
            handleSort("views", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button2" ? "bg-red-500" : "bg-[#222222]"
          }`}
        >
          Popluar
        </button>
        <button
          onClick={() => {
            setActiveButton("button3");
            handleSort("createdAt", "asc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button3" ? "bg-red-500" : "bg-[#222222]"
          }`}
        >
          Oldest
        </button>
      </div>
      {/* Video listing */}
      <div className=" flex flex-col gap-2  sm:flex sm:flex-row  flex-wrap  sm:gap-5  lg:gap-4 xl:gap-4">
        {videos?.map((video) => (
          <VideoCard
            key={video._id}
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail}
            createdAt={video.createdAt}
            views={video.views}
            videoId={video._id}
            dashboard="true"
            ownerId={video?.owner?._id}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelVideos;
