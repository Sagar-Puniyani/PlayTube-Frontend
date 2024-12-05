import React from "react";
import { PiFilmReelFill } from "react-icons/pi";
import { Button } from "./index";
import { IoCloseCircleOutline, TiTick } from "./icons";
import { useDispatch } from "react-redux";
import { updateUploadState,updateShow } from "../store/slice/videoSlice.js";
import { Loader } from "./index";
const UploadingVideo = ({
  videoFileName,
  fileSize,
  setUploadVideoPopup,
  uploaded,
}) => {
  const dispatch = useDispatch();

  const handleCancelAndFinish = () => {
    setUploadVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
    }));
    dispatch(updateShow());
    if (!uploaded) {
      dispatch(updateUploadState());
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
        <div className="w-96 p-3 text-white border outline-none rounded-lg space-y-5 border-slate-700 bg-black">
          <div className="flex items-start justify-between">
            <div>
              {uploaded ? (
                <h1 className="text-lg font-bold">Uploaded Video</h1>
              ) : (
                <h1 className="text-lg font-bold">Uploading Video...</h1>
              )}
              <span className="text-xs text-slate-400">
                Track your video uploading process.
              </span>
            </div>
            <IoCloseCircleOutline
              size={25}
              className="cursor-pointer"
              onClick={handleCancelAndFinish}
            />
          </div>
          <div className="border flex justify-start items-center p-1">
            <div className="mr-2">
              <PiFilmReelFill size={25} className="text-red-500" />
            </div>
            <div className="">
              <h1 className="text-sm font-semibold">{videoFileName}</h1>
              <p className="text-xs">{fileSize} MB</p>
              <div className="flex gap-2 items-center mt-2">
                {uploaded ? (
                  <>
                    <span className="text-xs flex items-center">
                      <TiTick size={25} className="text-red-500" />
                      Uploaded Successfully
                    </span>
                  </>
                ) : (
                  <>
                    <Loader />
                    <span className="text-xs">Loading ...</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div onClick={handleCancelAndFinish}>
              <Button className="border flex-1 p-2">Cancel</Button>
            </div>
            <div onClick={handleCancelAndFinish}>
              <Button
                className="flex-1 bg-red-500 p-2"
                textColor="text-black"
              >
                Finish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadingVideo;
