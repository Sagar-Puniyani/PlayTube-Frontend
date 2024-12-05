import React from 'react'
import { FaPlayCircle } from "react-icons/fa";


const NoVideosFound = ({text}) => {
    return (
        <div className="flex flex-col pb-20 items-center justify-center text-white h-screen">
            <FaPlayCircle
                size={45}
                className="text-red-500"
            />
            <p className="mt-4 text-lg font-bol">{text}</p>
        </div>
    );
}

export default NoVideosFound