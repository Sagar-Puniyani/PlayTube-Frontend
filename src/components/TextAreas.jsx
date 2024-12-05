import React, { useRef, useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { createAComment } from "../store/slice/commentSlice.js";
import { createAReply } from "../store/slice/replySlice.js";
import { createTweet } from "../store/slice/tweetSlice.js";
import { BsEmojiGrin } from "./icons";
import { Button } from "./Button";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


export const TextArea = ({
  comment,
  tweet,
  reply,
  videoId,
  avatarHeight,
  avatarWidth,
  placeholder,
  ButtonText,
  setopenReply,
  commentId
}) => {
  const user = useSelector((state) => state.auth.userData);
  const dispatch=useDispatch();
  const textareaRef = useRef(null);
  const [open,setOpen]=useState(false);
  const [text,setText]=useState("");
  const [openPicker,setopenPicker]=useState(false);
  const isCommentButtonActive = text.trim().length > 0;

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      const handleInput = () => {
        textarea.style.height = "auto"; // Reset height to auto to shrink if needed
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
      };

      textarea.addEventListener("input", handleInput);

      // Initial adjustment in case of pre-filled content
      handleInput();

      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }
  }, [text]);


  
  const handleChange=(e)=>{
    setText(e.target.value);
  }

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(comment){
      dispatch(createAComment({content:text,videoId:videoId,avatar:user.avatar,username:user.username,_id:user._id}));
      // reason for sending avatar is written in comment slice
      setOpen(false)
    }
    if(reply){
      dispatch(createAReply({content:text,commentId,avatar:user.avatar,username:user.username,_id:user._id,videoId}))
      setopenReply(false);
    }

    if(tweet){
      dispatch(createTweet({content:text,owner:{_id:user._id,username:user.username,avatar:user.avatar},likesCount:0}));
    }

    setText("");
   
   
    if(openPicker){
      setopenPicker(false);
    }

  }

  return (
    <div className="w-full  flex flex-row mt-[20px] gap-4">
      <div>
      <img
          src={user?.avatar}
          style={{ width: avatarWidth, height: avatarHeight }}
          className="rounded-full"
        />
      </div>
      <div className="basis-[94%] ">
        <form onSubmit={handleSubmit}>
          <textarea
            className="text-no-resize w-full text-white outline-none  bg-[#0F0F0F] min-h-[50px] border-b border-b-[#AAAAAA] placeholder-gray-400"
            placeholder={placeholder}
            ref={textareaRef}
            onClick={(e)=>{
              e.stopPropagation();
              setOpen(true);
            }}
            value={text}
            onChange={handleChange}
          />
          <div className={`${open?"block":"hidden"} w-full  flex flex-row justify-between p-[10px] items-center`}>
          {/* emoji picker */}
            <div className="cursor-pointer">
              <BsEmojiGrin
                color="white"
                className="font-bold h-[20px] w-[20px] relative hidden md:block"
                onClick={(e)=>{
                  e.stopPropagation();
                  setopenPicker((prev)=>!prev);
                }}
              />
              <div className={`z-10 absolute ${openPicker?"block":"hidden"} `}>
                <Picker data={data} onEmojiSelect={(e)=>{
                  setText((prev)=>prev+e.native);
                  // setopenPicker((prev)=>!prev);
                }}/>
              </div>
            </div>

            {/* buttons */}
            <div className="flex flex-row gap-2">
              <div onClick={(e)=>{
                e.stopPropagation();
                setOpen(false);
                setText("")
                if(setopenReply){
                  setopenReply(false)
                }
                
              }}>
              <Button className="font-semibold  p-[10px] w-[75px] rounded-full  text-[14px] hover:bg-[#222222]">Cancel</Button>
              </div>
              <div>
              <Button className={`font-semibold  p-[10px] w-[85px] rounded-full  text-[14px]${isCommentButtonActive?" text-white bg-red-500" :" text-gray-500 bg-[#272727]"}  `} type="submit" isActive={!isCommentButtonActive}>{ButtonText}</Button>
            
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
