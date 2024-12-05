import React, { useState, useEffect } from "react";
import { Button } from "../components";
import { useDispatch } from "react-redux";
import { toggleSubscriptions } from "../store/slice/subscriptionSlice.js";
import { timeAgo } from "../helper/timeAgo.js";
import { useNavigate } from "react-router-dom";

import Likes from "../components/Likes.jsx";
import PlaylistMenu from "./PlaylistMenu.jsx";

const Description = ({
  avatar,
  username,
  subscribersCount,
  isSubscribed,
  channelId,
  isLiked,
  likesCount,
  videoId,
  views,
  createdAt,
  Description,
}) => {
  const [localisSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] =
    useState(subscribersCount);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    setLocalIsSubscribed(isSubscribed);
    setLocalSubscribersCount(subscribersCount);
  }, [isSubscribed, subscribersCount]);

  const handleSubscription = (e) => {
    e.stopPropagation();
    dispatch(toggleSubscriptions({ channelId }));
    if (localisSubscribed) {
      setLocalSubscribersCount((prev) => prev - 1);
    } else {
      setLocalSubscribersCount((prev) => prev + 1);
    }
    setLocalIsSubscribed(!localisSubscribed);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row justify-between pt-[10px] pb-[10px] relative ">
        <div className="flex flex-row gap-4   justify-between">
          <div className="flex flex-row  gap-4">
            <div className=" cursor-pointer" onClick={(e)=>{
              e.stopPropagation();
              navigate(`/channel/${username}`)
            }}>
              <img
                src={avatar}
                className="w-[40px] h-[40px] rounded-full"
                alt="avatar"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-bold">{username}</h2>
              <p className="text-[#AAAAAA] text-[14px]">{`${localSubscribersCount} subscribers`}</p>
            </div>
          </div>
          <div className="mt-[6px]" onClick={handleSubscription}>
            <Button className="text-white font-bold text-[14px] bg-red-500 border-none outline-none h-[36px] w-[95px] rounded-full">
              {localisSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </div>
        </div>
        <div className="flex flex-row items-center cursor-pointer">
          <div className="rounded-full w-[110px] flex justify-between bg-[#222222] px-2 py-1 items-center mr-[20px] ">
            <Likes
              size={25}
              isLiked={isLiked}
              likesCount={likesCount}
              videoId={videoId}
              video="true"
            />
          </div>
          {/* three dots */}
          <PlaylistMenu className="text-white" videoId={videoId}/>
        </div>
      </div>
      <div className="w-full mt-2 bg-[#272727] text-white p-3 rounded-xl">
        <span className="text-[14px] font-semibold">{views}views</span>
        <span className="ml-2 text-[14px] font-semibold">
          {timeAgo(createdAt)}
        </span>
        <p className="text-[14px] md:text-[16px]">{Description}</p>
      </div>
    </>
  );
};

export default Description;
