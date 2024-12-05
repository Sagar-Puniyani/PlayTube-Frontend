import React, { useEffect, useState, useCallback } from "react";
import {
  Navbar,
  TextArea,
  Loader,
  BigLoader,
  InfinitScroll,
} from "../components";

import Video from "../components/Video";
import Description from "../components/Description";
import CommentAndReply from "../components/CommentAndReply";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../helper/timeAgo.js";
import { formatDuration } from "../helper/formatDuration.js";
import {
  getVideoComments,
  makeCommentsEmpty,
} from "../store/slice/commentSlice.js";
import {
  getVideoById,
  makeVideoNull,
  getAllVideos,
  makeVideosNull,
} from "../store/slice/videoSlice.js";
import { makeRepliesEmpty } from "../store/slice/replySlice.js";
import { MdOutlineSort, IoCloseCircleOutline } from "../components/icons";

const VideoDetail = () => {
  const [openSort, setopenSort] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setisFetching] = useState(false);
  const [sortType, setsortType] = useState("");
  const [sortBy, setsortBy] = useState("");
  const [loader, setloader] = useState(true);
  const [openMobileComments, setopenMobileComments] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videoId, ownerId } = useParams();

  const video = useSelector((state) => state.video?.video);
  const videos = useSelector((state) => state.video?.videos.docs);
  const isCommentSectionOn = useSelector(
    (state) => state.video?.video?.commentSection
  );
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const comments = useSelector((state) => state.comment?.comments) || [];
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
  const loading = useSelector((state) => state.comment?.loading);
  const commentAddedLoading = useSelector(
    (state) => state.comment?.commentAddedLoading
  );

  const isCommentPresent = totalComments > 0;

  // initial
  useEffect(() => {
    setloader(true);
    const timeoutId = setTimeout(() => {
      setloader(false);
    }, 2000);
    window.scrollTo(0, 0);

    dispatch(getVideoById({ videoId }));

    dispatch(getVideoComments({ videoId }));
    dispatch(getAllVideos({ userId: ownerId }));
    return () => {
      dispatch(makeVideoNull());
      dispatch(makeVideosNull());
      dispatch(makeCommentsEmpty());
      dispatch(makeRepliesEmpty());
      clearTimeout(timeoutId);
    };
  }, [dispatch, videoId, ownerId,]);




  // infinite scroll
  const fetchMoreComments = useCallback(() => {
    if (hasNextPage && !loading && !isFetching) {
      setisFetching(true);
      dispatch(getVideoComments({ videoId, page: page + 1, sortBy, sortType }));
      setisFetching(false);
      setPage((prev) => prev + 1);
    }
  }, [dispatch, hasNextPage, page, sortBy, sortType]);

  //custom loading
  useEffect(() => {
    if (!loading && isFetching) {
      const timeoutId = setTimeout(() => {
        setisFetching(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [loading, isFetching]);

  // handle sort
  useEffect(() => {
    if (sortBy && sortType) {
      dispatch(makeCommentsEmpty());
      setPage(1); // Reset page to 1 when sorting
      dispatch(getVideoComments({ videoId, sortBy, sortType, page: 1 }));
      setopenSort(false);
    }
  }, [sortBy, sortType, dispatch, videoId]);

  // Disable scroll when mobile comments are open
  useEffect(() => {
    if (openMobileComments) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openMobileComments]);

  return (
    <>
      <Navbar />
      {loader ? (
        <BigLoader />
      ) : (
        <div className="max-w-screen-2xl ">
          <div
            id="container"
            className="   xl:mt-[20px] xl:ml-[60px] xl:mr-[60px] md:flex md:flex-col  lg:flex lg:flex-row lg:gap-[1%]"
          >
            <div id="video-comment-container" className="  basis-[70%]">
              {/* video player */}
              <Video src={video?.videoFile} thumbnail={video?.thumbnail} />

              {/* video title */}
              <h1 className="text-white font-bold text-[16px] md:text-xl mt-2">
                {video?.title}
              </h1>

              {/* description */}
              <Description
                channelId={video?.owner?._id}
                avatar={video?.owner?.avatar}
                username={video?.owner?.username}
                subscribersCount={video?.owner?.subscribersCount}
                isSubscribed={video?.owner?.isSubscribed}
                isLiked={video?.isLiked}
                likesCount={video?.likesCount}
                videoId={video?._id}
                views={video?.views}
                createdAt={video?.createdAt}
                Description={video?.description}
                key={video?._id}
              />

              {/* comment section */}
              {isCommentSectionOn ? (
                <>
                  <div
                    className={`fixed bottom-0  left-0 w-full bg-[#0F0F0F] z-30 transition-transform duration-300 md:p-4  lg:p-0 ${
                      openMobileComments
                        ? "translate-y-0 h-screen overflow-auto"
                        : "translate-y-full h-0"
                    } lg:static lg:translate-y-0 lg:h-auto`}
                  >
                    <div className="flex flex-row gap-4 mt-8 md:mt-4 items-center">
                      <p className="text-white text-xl font-semibold w-auto ">
                        {totalComments}{" "}
                        {totalComments > 1 ? "Comments" : "Comment"}
                      </p>
                      <div
                        className=" flex flex-row gap-1 relative cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setopenSort((prev) => !prev);
                        }}
                      >
                        <MdOutlineSort className="text-white" size={24} />
                        <span className="text-white font-semibold ">
                          Sort by
                        </span>

                        {/* div opens when sort by is clicked */}
                        <div
                          className={`z-10 w-[130px]  bg-[#272727] absolute rounded-xl top-10 flex flex-col p-2 ${
                            openSort ? "block" : "hidden"
                          }`}
                        >
                          <div
                            className="text-white font-semibold mb-2  hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              setsortBy("likesCount");
                              setsortType("desc");
                              setopenSort(false);
                            }}
                          >
                            <span>Top comments</span>
                          </div>

                          <div className="flex flex-col text-white">
                            <div
                              className="flex items-center gap-2 py-1 font-semibold  cursor-pointer hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                setsortBy("createdAt");
                                setsortType("desc");
                                setopenSort(false);
                              }}
                            >
                              <span>Newest First</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add a Comment Text Area */}

                    <TextArea
                      comment={true}
                      videoId={video?._id}
                      avatarHeight={"40px"}
                      avatarWidth={"40px"}
                      placeholder="Add a comment..."
                      ButtonText="Comment"
                    />

                    {/* comment list */}
                    <InfinitScroll
                      fetchMore={fetchMoreComments}
                      hasNextPage={hasNextPage}
                    >
                      <div className="w-full  mt-[20px]  flex flex-col gap-2 ">
                        {commentAddedLoading && <Loader />}
                        {comments.map((comment) => (
                          <CommentAndReply
                            key={comment?._id}
                            avatar={comment?.owner?.avatar}
                            username={comment?.owner?.username}
                            content={comment?.content}
                            createdAt={comment?.createdAt}
                            ownersId={comment?.owner?._id}
                            commentId={comment?._id}
                            videoOwner={video?.owner?._id}
                            videoOwneravatar={video?.owner?.avatar}
                            isLiked={comment?.isLiked}
                            likesCount={comment?.likesCount}
                            videoId={video?._id}
                          />
                        ))}
                        {(loading || isFetching) && <Loader />}
                      </div>
                    </InfinitScroll>

                    {/* close button for mobile comment section */}
                    <div
                      className="cursor-pointer text-white  absolute z-10 top-8 right-4 block lg:hidden "
                      onClick={(e) => {
                        e.stopPropagation();
                        setopenMobileComments(false);
                      }}
                    >
                      <IoCloseCircleOutline className="text-white font-bold w-[30px] h-[30px] " />
                    </div>
                  </div>

                  {/* open mobile comment section */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setopenMobileComments(true);
                    }}
                    className=" w-full  mt-3 mb-3 p-4 cursor-pointer bg-[#272727] block lg:hidden"
                  >
                    <span className="text-white font-bold text-[18px]">
                      Comments
                    </span>
                    <span className="text-white font-bold ml-1">
                      {totalComments}
                    </span>
                    {isCommentPresent ? (
                      <div className="flex flex-row gap-4 mt-3 items-center">
                        <img
                          src={comments[0]?.owner?.avatar}
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <p className="text-white">{comments[0]?.content}</p>
                      </div>
                    ) : (
                      <div className=" p-4 rounded-xl bg-red-400 mt-2">
                        <p className="text-white font-bold">Add a Comment...</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-red-500 text-center mt-6 mb-6 font-semibold">
                  Comments are turned off
                </p>
              )}
            </div>

            {/* more videos container */}
            <div className=" basis-[29%]  ">
              <h1 className="text-white text-center font-bold text-xl">{`More From ${video?.owner?.username}`}</h1>
              <div
                id="more-video-container"
                className="  flex flex-col gap-4 pt-3"
              >
                {videos.map((item) => (
                  <div
                    className="cursor-pointer  w-full lg:h-[100px] flex flex-col md:flex-row gap-[20px] md:gap-[3%] "
                    onClick={(e) => {
                      e.stopPropagation();
                      const videoId = item._id;
                      const ownerId = item?.owner?._id;
                      navigate(`/watch/${videoId}/${ownerId}`);
                    }}
                    key={item?._id}
                  >
                    <div className=" h-[200px] w-full md:basis-[30%] lg:basis-[45%] md:h-full object-cover  relative">
                      <img
                        src={item.thumbnail}
                        className="w-full h-full md:rounded-xl "
                      />
                      <span className="text-sm rounded-lg text-white py-1 px-2 bg-black absolute bottom-1 right-1">
                        {formatDuration(item.duration)}
                      </span>
                    </div>
                    <div className=" h-full basis-[52%]">
                      <h2 className="text-white font-bold line-clamp-1">
                        {item.title}
                      </h2>
                      <p className="text-[#AAAAAA]">{item.owner.username}</p>
                      <p className="text-[#AAAAAA] text-[14px]">
                        {`${item.views} views . ${timeAgo(item.createdAt)} `}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetail;
