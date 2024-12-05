import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikedVideos,
  makeLikedVideosEmpty,
} from "../store/slice/likeSlice.js";
import PlaylistSkeleton from "../skeletons/PlaylistSkeleton";
import PlaylistandLikedVideo from "../components/PlaylistandLikedVideo";
import NoVideosFound from "../components/NoVideosFound";

const LikedVideos = () => {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.like?.likedVideos) || [];
  const loading = useSelector((state) => state.like?.loading);
  const bgImage = likedVideos[0]?.likedVideo?.thumbnail;
  const fullname = useSelector((state) => state.auth?.userData?.fullname);
  const likedVideosLength=likedVideos.length

  useEffect(() => {
    dispatch(getLikedVideos());

    return () => {
      dispatch(makeLikedVideosEmpty());
    };
  }, []);

  if (loading) {
    return <PlaylistSkeleton></PlaylistSkeleton>;
  }

  if(likedVideos && likedVideos.length===0){
    return (<NoVideosFound text="There are no videos available here."/>)
  }
  return (
    <>
      <PlaylistandLikedVideo
        bgImage={bgImage}
        fullname={fullname}
        videolength={likedVideosLength}
        Videos={likedVideos}
        likedVideos="true"
        Text="Liked Videos"
      />
    </>
  );
};

export default LikedVideos;
