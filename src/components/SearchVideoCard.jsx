import React from "react";
import { formatDuration } from "../helper/formatDuration.js";
import { timeAgo } from "../helper/timeAgo.js";
import { ImCross } from "../components/icons";
import { deleteVideoFromWatchHistory } from "../store/slice/userSlice.js";
import { useDispatch } from "react-redux";

export const SearchVideoCard = ({
  thumbnail,
  duration,
  createdAt,
  avatar,
  username,
  videoId,
  title,
  views,
  description,
  ownerId,
  history,
  _id,
}) => {
  const navigate = React.useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/watch/${videoId}/${ownerId}`);
      }}
      className="w-full  md:h-[280.55px] sm:flex sm:flex-col  md:flex md:flex-row  md:gap-3 cursor-pointer relative"
    >
      <div className="h-[200px] sm:h-[350px] md:basis-[60%] lg:basis-[40%] md:h-full  relative">
        <img src={thumbnail} className="w-full h-full sm:rounded-xl" />
        <span className="text-sm rounded-lg text-white py-1 px-2 bg-black absolute bottom-2 right-2">
          {formatDuration(duration)}
        </span>

        {/* cross sign */}
        <div
          className={`${
            history ? "block" : "hidden"
          } absolute   top-2 right-2`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteVideoFromWatchHistory({ id: _id }));
          }}
        >
          <ImCross className="text-white hover:text-red-500" size={25} />
        </div>
      </div>
      <div className="p-[5px] sm:p-[10px] md:p-[0px]  flex flex-row gap-4  md:basis-[40%] lg:basis-[60%] md:flex md:flex-col md:gap-2">
        <div className="order-2 md:order-1">
          <h3 className="text-white  break-words md:w[80%] lg:w-[80%]  font-medium sm:text-xl">
            {title}
          </h3>
          <span className="text-[#AAAAAA] text-[14px]">{`${views} views . ${timeAgo(
            createdAt
          )}`}</span>
          <h3 className="text-[#AAAAAA] md:hidden">{username}</h3>
        </div>
        <div className="order-1 md:order-2 flex flex-col  md:flex md:flex-row md:gap-4 items-center">
          <img
            src={avatar}
            className="w-[40px] h-[40px] md:w-[24px] md:h-[24px] rounded-full"
            onClick={(e)=>{
              e.stopPropagation();
              navigate(`/channel/${username}`)
            }}
          />
          <h3 className="text-[#AAAAAA] hidden md:block">{username}</h3>
        </div>
        <div className="text-[#AAAAAA] hidden md:block order-3">
          <p
            className="text-[14px] line-clamp-1"
            title="from the video description"
          >
            {description}
          </p>
        </div>
        

        
      </div>
    </div>
  );
};
