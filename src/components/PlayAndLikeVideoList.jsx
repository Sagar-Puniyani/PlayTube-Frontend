import  { useState } from "react";
import { timeAgo } from "../helper/timeAgo.js";
import { formatDuration } from "../helper/formatDuration.js";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical, MdDelete } from "../components/icons";
import { deletLikedVideo } from "../store/slice/likeSlice.js";
import { deleteVideoFromPlaylist } from "../store/slice/playlistSlice.js";
import { useDispatch,useSelector } from "react-redux";
const PlayAndLikeVideoList = ({
  thumbnail,
  username,
  views,
  createdAt,
  navigates,
  duration,
  title,
  index,
  likedVideos,
  Playlist,
  videoId
}) => {
  const [Open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const playlistId=useSelector((state)=>state.playlist?.PlaylistId);
  const PlaylistName=useSelector((state)=>state.playlist?.PlaylistName);

  const handleClick=()=>{
    if(likedVideos){
      dispatch(deletLikedVideo({videoId}))
    }
    if(Playlist){
      dispatch(deleteVideoFromPlaylist({playlistId,videoId,PlaylistName}))
    }
    setOpen(false);
  }



  const navigate = useNavigate();
  return (
    <div>
      {/* video container */}
      <div
        className="flex flex-row items-center  sm:p-2 gap-4 cursor-pointer rounded-xl hover:bg-[#212121] relative"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`${navigates}`);
        }}
      >
        {/* index */}
        <div className="text-white hidden sm:block">{index}</div>
        {/* video */}
        <div className="relative ">
          <img
            src={thumbnail}
            className="w-[200px] sm:w-[160px] h-[100px] sm:h-[90px] rounded-sm"
          />
          <span className="absolute text-[12px] p-1 bottom-1 right-1 text-white rounded-sm bg-black">
            {formatDuration(duration)}
          </span>
        </div>

        {/* information */}

        <div className="  flex flex-col gap-2  basis-[60%] sm:basis-[80%]  ">
          <p className="text-white line-clamp-1 font-semi-bold">{title}</p>

          <div className="text-[#AAAAAA] text-[16px] sm:flex sm:flex-row sm:gap-3">
            <p>{`${username} ${views} views`}</p>
            <p> {timeAgo(createdAt)}</p>
          </div>
        </div>

        {/*three dots  */}
        <div className="w-[50px] h-[50px]  flex flex-row items-center justify-center relative" onClick={(e)=>{
          e.stopPropagation();
          setOpen((prev)=>!prev)
        }}>
          <BsThreeDotsVertical className="text-white hover:text-red-500" />
        </div>

        {/* div opens when three dots gets clicked */}

        <div
          className={`${
            Open ? "block" : "hidden"
          } z-10 w-[130px]  bg-[#272727] absolute rounded-xl right-[30px] bottom-[1px]  flex flex-col gap-2 p-2`}
        >
          <div
            className="flex items-center gap-2 text-white hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <MdDelete className="w-[24px] h-[24px]" />
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayAndLikeVideoList;
