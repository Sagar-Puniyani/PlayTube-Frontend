import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistById, makeVideosEmpty } from '../store/slice/playlistSlice.js'
import { useSelector,useDispatch } from 'react-redux'
import PlaylistandLikedVideo from '../components/PlaylistandLikedVideo'
import PlaylistSkeleton from '../skeletons/PlaylistSkeleton'

const Playlist = () => {
    const dispatch=useDispatch();
    const {playlistId}=useParams();
    const videos=useSelector((state)=>state?.playlist?.videos);
    const thumbnail=videos.length>0 &&  videos[0]?.video?.thumbnail;
    const totalVideos=videos && videos.length;
    const PlaylistName=useSelector((state)=>state?.playlist?.PlaylistName)
    const user=useSelector((state)=>state?.auth?.userData);
    const loading=useSelector((state)=>state?.playlist?.loading);

    useEffect(()=>{
        dispatch(getPlaylistById({playlistId}))

        return ()=>{
            dispatch(makeVideosEmpty())
        }


    },[])


    if(loading){
      return <PlaylistSkeleton/>
    }



  return (
    <PlaylistandLikedVideo
        bgImage={thumbnail}
        fullname={user?.fullname}
        videolength={totalVideos}
        Videos={videos}
        Playlist="true"
        Text={PlaylistName}
    />
  )
}

export default Playlist