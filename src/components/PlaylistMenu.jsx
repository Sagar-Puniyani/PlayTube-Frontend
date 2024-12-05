import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  createPlaylist,
} from "../store/slice/playlistSlice.js";
import {
  BsThreeDotsVertical,
  MdSaveAlt,
  IoCloseCircleOutline,
  FaPlus,
} from "../components/icons";
const PlaylistMenu = ({ videoId,className }) => {
  const dispatch = useDispatch();

  const [playlistPopOpen, setplaylistPopOpen] = useState(false);
  const [checkedPlaylists, setCheckedPlaylists] = useState({});
  const [Text, setText] = useState("");
  const [openList, setopenList] = useState(false);
  const [openInput, setopenInput] = useState(false);
  const inputRef = useRef(null);
  const playlists = useSelector((state) => state.playlist?.playlists) || [];
  // to check is video is present in particular playlist
  const isVideoPresent = (playlistId) => {
    return checkedPlaylists[playlistId] || false;
  };
  // to check initial checked
  useEffect(() => {
    if (playlists.length!==0) {
      const initialCheckedState = {};
      
      playlists.forEach((playlist) => {
        const videos = playlist.videos || []; // Default to an empty array
        initialCheckedState[playlist._id] =  videos.some(
          (video) => video?.video?._id === videoId
        );
      });
      setCheckedPlaylists(initialCheckedState);
    }
  }, [playlists, videoId]);

  // to focus input
  useEffect(() => {
    if (openInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openInput]);
  // to handle change of checkbox
  const handleChange = (playlistId, isChecked, PlaylistName) => {
    if (isChecked) {
      dispatch(addVideoToPlaylist({ videoId, playlistId, PlaylistName }));
    } else {
      dispatch(deleteVideoFromPlaylist({ playlistId, videoId, PlaylistName }));
    }
    setCheckedPlaylists((prev) => ({
      ...prev,
      [playlistId]: isChecked,
    }));
  };
  const handleCreatePlaylist = async () => {
    setopenList(false);
    setopenInput(false);
      setplaylistPopOpen(false);
      setText("");
    const resultAction = await dispatch(createPlaylist(Text));
    console.log(resultAction);
    if (resultAction.type === "createPlaylist/fulfilled") {
      const newPlaylist = resultAction.payload;
      dispatch(
        addVideoToPlaylist({
          videoId,
          playlistId: newPlaylist._id,
          PlaylistName: newPlaylist.name,
        })
      );
      
      const playlistId = newPlaylist._id;
      setCheckedPlaylists((prev) => ({
        ...prev,
        [playlistId]: true,
      }));
    }
  };

  return (
    <>
      {/* three dots for opening save to playlist */}
      <BsThreeDotsVertical
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          if (!openList) {
            setplaylistPopOpen((prev) => !prev);
          }
        }}
      />

      {/* div opens when three dots gets clicked */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={` ${
          playlistPopOpen ? "block" : "hidden"
        } absolute w-[253px]  z-10 bg-[#272727] rounded-xl bottom-[18px] right-[10px] pt-3 pb-3`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setopenList((prev) => !prev);
            setplaylistPopOpen(false);
          }}
          className=" flex flex-row justify-center gap-5 hover:text-red-500 text-white pt-2 pb-2"
        >
          <div>
            <MdSaveAlt size={24} />
          </div>
          <p>Save to playlist</p>
        </div>
      </div>

      {/* div opens when save to playlist gets clicked */}
      <div
        className={`${
          openList ? "block" : "hidden"
        }  w-[200px]  absolute right-[10px] bottom-[18px] z-10 bg-[#272727] rounded-xl  p-5 `}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-white font-bold">Save video to...</h1>

        {playlists.map((item) => {
          return (
            <div
              key={item?._id}
              className="mt-5 flex flex-row gap-4 items-center"
            >
              <input
                type="checkbox"
                checked={isVideoPresent(item?._id)}
                onChange={(e) => {
                  e.stopPropagation();
                  handleChange(item?._id, e.target.checked, item.name);
                }}
                className="w-[20px] h-[20px] outline-none cursor-pointer text-[#272727]"
              />
              <label  className="cursor-pointer">
                <h1 className="text-white hover:text-red-500 line-clamp-1">
                  {item.name}
                </h1>
              </label>
            </div>
          );
        })}

        {/*cross button  */}

        <IoCloseCircleOutline
          onClick={(e) => {
            e.stopPropagation();
            setopenList(false);
            setopenInput(false);
          }}
          className="text-white absolute top-5 hover:text-red-500 right-2"
          size={24}
        />

        {/* create new playlist */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setopenInput(true);
          }}
          className={` ${
            openInput ? "hidden" : "block"
          }  mt-4 flex flex-row gap-4  items-center `}
        >
          <FaPlus className="text-white hover:text-red-500" size={20} />
          <span className="text-white hover:text-red-500 text-[14px] ">
            Create new playlist
          </span>
        </div>

        {/* Input to create new playlist  */}

        <div className={`${openInput ? "block" : "hidden"} mt-4`}>
          <label htmlFor="1" className="text-white font-semibold">
            Name
          </label>
          <input
            ref={inputRef}
            value={Text}
            type="text"
            id="1"
            placeholder="Enter playlist title..."
            className="text-white w-full border-b-2 border-gray-300 focus:border-red-500 outline-none transition-colors bg-[#272727] placeholder:text-white"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div
            className="mt-4 text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleCreatePlaylist();
            }}
          >
            <p className="text-end">Create</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistMenu;
