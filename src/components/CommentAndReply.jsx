import React, { useState, useEffect, useRef } from "react";
import { timeAgo } from "../helper/timeAgo.js";
import {
  BsThreeDotsVertical,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "./icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteAComment, editAComment } from "../store/slice/commentSlice.js";
import { useNavigate } from "react-router-dom";
import { BsEmojiGrin } from "./icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { TextArea, Button, Loader } from "../components";
import { getAllRepliesOfComment } from "../store/slice/replySlice.js";
import { deleteTweet,updateTweet } from "../store/slice/tweetSlice.js";

import Likes from "../components/Likes.jsx";
import Reply from "../components/Reply.jsx";

const CommentAndReply = ({
  avatar,
  username,
  createdAt,
  content,
  ownersId,
  commentId,
  videoOwner,
  isLiked,
  likesCount,
  videoOwneravatar,
  videoId,
  tweet,
  tweetId,
}) => {
  const user = useSelector((state) => state.auth?.userData);
  const replies = useSelector((state) => state.reply?.replies);
  const loading = useSelector(
    (state) => state.comment.commentDeleteandEditLoading[commentId]
  );
  const specificComment = replies.find(
    (comment) => comment.commentId === commentId
  );
  const commentReplies = specificComment?.replies || [];
  const isReplyEmpty = commentReplies.length === 0;
  const navigate = useNavigate();

  const [text, setText] = useState(content);
  const [openPicker, setopenPicker] = useState(false);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [textAreaOpen, setTextAreaOpen] = useState(false);
  const [openReply, setopenReply] = useState(false);
  const [openReplies, setopenReplies] = useState(false);

  const dispatch = useDispatch();
  const isOwner = user?._id === ownersId;
  const isvideoOwner = videoOwner === user?._id;
  const textareaRef = useRef(null);

  const isCommentButtonActive =
    text.trim().length > 0 && text.trim() !== content;

  const isVideoOwnerReplied =
    commentReplies &&
    commentReplies.some((reply) => reply.owner._id === videoOwner);

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

  useEffect(() => {
    if (!tweet) {
      dispatch(getAllRepliesOfComment({ commentId }));
    }
  }, [dispatch, commentId]);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if(commentId){
      dispatch(
        editAComment({
          content: text,
          commentId,
          avatar,
          username,
          _id: ownersId,
          createdAt,
          likesCount,
          isLiked,
        })
      );
    }

    if(tweetId){
      dispatch(updateTweet({tweetId,content:text}))

    }

    setopen(false);
    
    setopenEdit(false);
  };

  if (loading && !tweet) {
    return <Loader></Loader>;
  }
  return (
    <>
      {/* comment*/}
      <div
        className={`${
          openEdit ? "hidden" : "block"
        }  flex flex-row w-full  gap-4 p-[10px]`}
      >
        <div
          className=" w-[40px] h-[40px] rounded-full cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/channel/${username}`);
          }}
        >
          <img src={avatar} className="w-[40px] h-[40px] rounded-full" />
        </div>
        <div className="basis-[94%]">
          {/* heading time */}
          <div className="flex flex-row gap-1">
            <h3 className="text-white font-bold text-[14px]">@{username}</h3>
            <span className="text-[#AAAAAA] text-[14px]">
              {timeAgo(createdAt)}
            </span>
          </div>

          {/* content */}
          <p className="text-white font-semibold mt-[5px]">{content}</p>

          {/* likes and reply button */}
          <div className="flex flex-row  gap-5  items-center h-[50px] ">
            {/* like button for comments */}
            {!tweet && (
              <div className="flex flex-row  w-[10%]  justify-center  ">
                <Likes
                  commentId={commentId}
                  size={20}
                  isLiked={isLiked}
                  likesCount={likesCount}
                  videoId={videoId}
                />
              </div>
            )}

            {/* like button for tweets */}

            {tweet && (
              <div className="flex flex-row  w-[10%]  justify-center  ">
                <Likes
                  tweetId={tweetId}
                  size={20}
                  isLiked={isLiked}
                  likesCount={likesCount}
                />
              </div>
            )}

            {!tweet && (
              <div
                className=" hover:bg-[#272727] p-2 rounded-full cursor-pointer flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setopenReply((prev) => !prev);
                }}
              >
                {!tweet && <Button className="text-[14px]">Reply</Button>}
              </div>
            )}
          </div>

          {/* text area opens when reply button is clicked */}
          <div className={`${openReply ? "block" : "hidden"}`}>
            <TextArea
              setopenReply={setopenReply}
              placeholder="Add a reply..."
              avatarWidth="30px"
              avatarHeight="30px"
              reply={true}
              ButtonText="Reply"
              commentId={commentId}
              videoId={videoId}
            />
          </div>

          {/* view reply div */}
          {!isReplyEmpty && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setopenReplies((prev) => !prev);
              }}
              className={`font-bold cursor-pointer items-center flex flex-row gap-2 w-auto ${
                isVideoOwnerReplied
                  ? "  sm:w-[26%] md:w-[21%] lg:w-[17%]"
                  : " sm:w-[20%] md:w-[17%] lg:w-[14%]"
              } rounded-full py-[6px] px-[10px] text-[#3ea6ff] sm:hover:bg-blue-200`}
            >
              <MdKeyboardArrowDown
                size={24}
                className={`${openReplies ? "hidden" : "block"}`}
              />
              <MdKeyboardArrowUp
                size={24}
                className={`${openReplies ? "block" : "hidden"}`}
              />
              <img
                src={videoOwneravatar}
                className={`${
                  isVideoOwnerReplied ? "block" : "hidden"
                } w-[24px] h-[24px] rounded-full`}
              />
              <span>
                {commentReplies.length}{" "}
                {commentReplies.length > 1 ? "replies" : "reply"}
              </span>
            </div>
          )}
        </div>

        {/* three dots for edit and delete comment */}
        <div
          className={`cursor-pointer ${
            isOwner || isvideoOwner ? "block" : "hidden"
          } relative`}
        >
          <BsThreeDotsVertical
            color="white"
            onClick={(e) => {
              e.stopPropagation();
              setopen((prev) => !prev);
            }}
          />
          {/* div opens when three dots gets clicked */}
          <div
            className={`${
              open ? "block" : "hidden"
            } z-10 w-[130px]  bg-[#272727] absolute rounded-xl top-5 -left-[111px]   lg:left-0 flex flex-col gap-2 p-2`}
          >
            <div
              className={`${
                isOwner ? "block" : "hidden"
              } flex items-center gap-2  text-white hover:text-red-500`}
              onClick={(e) => {
                e.stopPropagation();
                setopenEdit((prev) => !prev);
              }}
            >
              <MdEdit className="w-[24px] h-[24px]" />
              <span>Edit</span>
            </div>
            <div
              className="flex items-center gap-2 text-white hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                if(commentId){
                  dispatch(deleteAComment({ commentId }));
                }
                if(tweetId){
                  dispatch(deleteTweet({ tweetId }));

                }
              }}
            >
              <MdDelete className="w-[24px] h-[24px]" />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>

      {/* textarea when edit button is clicked */}
      <div
        className={`w-full  flex flex-row mt-[20px] gap-4 ${
          openEdit ? "block" : "hidden"
        }`}
      >
        <div>
          <img src={avatar} className={`w-[40px] h-[40px] rounded-full`} />
        </div>
        <div className="basis-[94%] ">
          <form onSubmit={handleSubmit}>
            <textarea
              className="text-no-resize w-full text-white outline-none  bg-[#0F0F0F] min-h-[50px] border-b border-b-[#AAAAAA] placeholder-gray-400"
              placeholder="Edit A Comment..."
              ref={textareaRef}
              onClick={(e) => {
                e.stopPropagation();
                setTextAreaOpen(true);
              }}
              value={text}
              onChange={handleChange}
            />
            <div
              className={`${
                textAreaOpen ? "block" : "hidden"
              } w-full  flex flex-row justify-between p-[10px] items-center`}
            >
              {/* emoji picker */}
              <div className="cursor-pointer ">
                <BsEmojiGrin
                  color="white"
                  className="font-bold h-[20px] w-[20px] relative "
                  onClick={(e) => {
                    e.stopPropagation();
                    setopenPicker((prev) => !prev);
                  }}
                />
                <div
                  className={`z-10 absolute ${
                    openPicker ? "block" : "hidden"
                  } `}
                >
                  <Picker
                    data={data}
                    onEmojiSelect={(e) => {
                      setText((prev) => prev + e.native);
                      // setopenPicker((prev)=>!prev);
                    }}
                  />
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-row gap-2">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setTextAreaOpen(false);
                    setopenEdit(false);
                  }}
                >
                  <Button className="font-semibold  p-[10px] w-[75px] rounded-full  text-[14px] hover:bg-[#222222]">
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    className={`font-semibold  p-[10px] w-[85px] rounded-full  text-[14px]${
                      isCommentButtonActive
                        ? " text-white bg-red-500"
                        : " text-gray-500 bg-[#272727]"
                    }  `}
                    type="submit"
                    isActive={!isCommentButtonActive}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* replies  opens when view reply is clicked*/}
      <div className={`${openReplies ? "block" : "hidden"}`}>
        {commentReplies &&
          commentReplies.map((reply) => (
            <div className="  ml-[60px]" key={reply.content}>
              <Reply
                avatar={reply?.owner?.avatar}
                username={reply?.owner.username}
                ownersId={reply?.owner?._id}
                videoOwner={videoOwner}
                content={reply?.content}
                isLiked={reply?.isLiked}
                likesCount={reply?.likesCount}
                replyId={reply?._id}
                createdAt={reply?.createdAt}
                commentId={commentId}
                videoId={videoId}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentAndReply;
