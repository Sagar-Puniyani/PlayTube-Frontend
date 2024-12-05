import React,{useState} from 'react'
import { CgPlayList, BsThreeDotsVertical,MdDelete } from "../components/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deletePlaylist } from '../store/slice/playlistSlice.js';



const PlaylistsVIdeoCard = ({playlistId,thumbnail,totalVideos,playlistName}) => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const [open,setOpen]=useState(false);
  return (
    <div
              className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/playlists/${playlistId}`);
              }}
            >
              <div className="h-[50px] w-[70%]  bg-[#606060]  rounded-xl "></div>

              <div className="w-[80%] top-[3px]  bg-[#768893] absolute h-[50px] rounded-xl "></div>

              <div className="absolute w-[90%] top-[8px] h-[166.8px]">
                <img
                  src={thumbnail}
                  className="w-full rounded-xl h-[166.8px]"
                />
              </div>

              <div className=" absolute bottom-[70px] right-[30px] z-10  bg-[#00000099] flex flex-row items-center p-2 gap-1">
                <CgPlayList className="text-white font-bold" size={20} />
                <span className="text-white text-[14px]">
                  {totalVideos
                    ? `${totalVideos} videos`
                    : "No videos"}
                </span>
              </div>

              <div className=" mt-[140px]">
                <h1 className="text-white text-center font-bold hover:text-red-500">
                  {playlistName}
                </h1>
              </div>
              {/* three dots  */}
              <div className="absolute bottom-[30px] right-[25px]  w-[100px] h-[20px] flex flex-row justify-end" onClick={(e)=>{
                e.stopPropagation();
                setOpen((prev)=>!prev);
              }}>
                <BsThreeDotsVertical  className="text-white hover:text-red-500" />
              </div>

              {/* div opens when three dots gets clicked */}

              <div
                className={`${open?"block":"hidden"} z-10 w-[130px]  bg-[#272727] absolute rounded-xl  right-[30px] -bottom-[9px] flex flex-col gap-2 p-2`}
              >
                <div className="flex items-center gap-2 text-white hover:text-red-500" onClick={(e)=>{
                    e.stopPropagation();
                    dispatch(deletePlaylist({playlistId}))
                }}>
                  <MdDelete className="w-[24px] h-[24px]" />
                  <span>Delete</span>
                </div>
              </div>
            </div>
  )
}

export default PlaylistsVIdeoCard