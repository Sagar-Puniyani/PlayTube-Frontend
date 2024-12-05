import React from "react";
import { formatDuration } from "../helper/formatDuration";
import { timeAgo } from "../helper/timeAgo.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlaylistMenu from "./PlaylistMenu";

export const VideoCard = ({
  title,
  thumbnail,
  videoId,
  avatar,
  duration,
  channel,
  views,
  createdAt,
  ownerId,
  dashboard
  
}) => {
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth?.status);
  const username=channel;

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/watch/${videoId}/${ownerId}`);
        }}
        className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] "
      >
        <div id="thumbnail-container" className="relative">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-[224px] sm:rounded-xl"
          />
          <span className="text-sm rounded-lg text-white py-1 px-2 bg-black absolute bottom-2 right-2">
            {formatDuration(duration)}
          </span>
        </div>
        <div
          id="content-container"
          className="mt-3 flex flex-row gap-4 items-center "
        >
          <div id="avatar" className={`${dashboard ?"hidden":"block"}`} onClick={(e)=>{
            e.stopPropagation();
            navigate(`/channel/${username}`)
          }}>
            <img
              src={avatar}
              className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0"
            />
          </div>
          <div id="content" className="w-[80%] ">
            <h2 className="text-white font-bold text-[15px] lg:text-[16px] line-clamp-2">
              {title}
            </h2>
            <div className="text-[#AAAAAA]">
              <h2 className="text-[15px] lg-text[12px] truncate">{channel}</h2>
              <span className="text-[13px] lg:text-[16px]">{`${views} views. ${timeAgo(
                createdAt
              )}`}</span>
            </div>
          </div>
        </div>

        {isAuth && (
          <PlaylistMenu
            videoId={videoId}
            className=" text-white absolute bottom-[60px] sm:bottom-[80px] right-[5px] sm:right-0 cursor-pointer"
          />
        )}
      </div>
    </>
  );
};
