import React from 'react'

 const Video = ({src,thumbnail}) => {
  return (
    <video
                src={src}
                poster={thumbnail}
                autoPlay
                controls
                playsInline
                className="  sm:h-[250px] md:h-[460px] w-full object-contain lg:rounded-xl"
            ></video>
  )
}
export default Video;
