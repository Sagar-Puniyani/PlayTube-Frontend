import React from "react";
import PlayAndLikeVideoList from "./PlayAndLikeVideoList";

const PlaylistandLikedVideo = ({ bgImage, fullname, videolength, Videos,likedVideos,Text,Playlist }) => {
  if(!bgImage){
    bgImage="https://i.ytimg.com/img/no_thumbnail.jpg"
  }

  return (
    <>
      {/* page container */}
      <div className="   flex flex-col  gap-4 lg:p-5  ">
        {/* banner */}
        <div
          className=" relative   w-full h-[350px] lg:rounded-xl"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
            backgroundSize: "400% 250%",
            backgroundPosition: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* banner inner container */}
        <div className="absolute top-[100px] w-full sm:w-[80%] h-[350px] flex flex-col items-center justify-center ">
          {/* image */}
          <div className="h-[175px] rounded-xl ">
            <img src={bgImage} className="h-full rounded-xl" />
          </div>
          <div>
            {/* heading */}
            <h1 className="text-white font-bold text-[28px]">{Text}</h1>

            {/* fullname and videos count */}

            <div className="flex flex-col gap-1 ">
              <p className="text-white text-[14px] uppercase font-bold">
                {fullname}
              </p>
              <span className="text-white text-[14px]">
                {videolength} videos
              </span>
            </div>
          </div>
        </div>

        {/* video list */}
        {likedVideos && (
          <div className="flex flex-col  gap-4 p-2 ">
          {Videos.map((video, index) => {
            return (
              <PlayAndLikeVideoList
                key={index}
                thumbnail={video?.likedVideo?.thumbnail}
                duration={video?.likedVideo?.duration}
                title={video?.likedVideo?.title}
                username={video?.likedVideo?.ownerDetails?.username}
                views={video?.likedVideo?.views}
                createdAt={video?.likedVideo?.createdAt}
                index={index}
                navigates={`/watch/${video?.likedVideo?._id}/${video?.likedVideo?.ownerDetails?._id}`}
                likedVideos={likedVideos}
                videoId={video?.likedVideo?._id}
              />
            );
          })}
        </div>
        )}

        {/* video list for playlist */}
        {Playlist && (
          <div className="flex flex-col  gap-4 p-2 ">
          {Videos.map((video, index) => {
            return (
              <PlayAndLikeVideoList
                key={index}
                thumbnail={video?.video?.thumbnail}
                duration={video?.video?.duration}
                title={video?.video?.title}
                username={video?.video?.owner?.username}
                views={video?.video?.views}
                createdAt={video?.video?.createdAt}
                index={index}
                navigates={`/watch/${video?.video?._id}/${video?.video?.owner?._id}`}
                Playlist={Playlist}
                videoId={video?.video?._id}

              />
            );
          })}
        </div>
        )}
      </div>
    </>
  );
};

export default PlaylistandLikedVideo;
