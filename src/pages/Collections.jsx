import { useEffect, useState } from "react";
import { Navbar, Button, BigLoader, Loader } from "../components/";
import { useSelector, useDispatch } from "react-redux";
import {
  getChannelStats,
  getChannelVideos,
  makeChannelVideosEmpty,
} from "../store/slice/dashboardSlice.js";

import {
  MdOutlineSlowMotionVideo,
  FaRegEye,
  RxAvatar,
  FaRegHeart,
  ImBin,
} from "../components/icons";
import DashboardVideoTable from "../components/DashboardVideoTable";
import UploadVideo from "../components/UploadVideo";
import { deleteAvideo } from "../store/slice/videoSlice.js";
import EditVideo from "../components/EditVideo";

const Collections = () => {
  const username = useSelector((state) => state?.auth?.userData?.username);
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard?.channelStats);
  const videos = useSelector((state) => state?.dashboard?.channelVideos);
  const uploaded = useSelector((state) => state.video.uploaded);
  const deleting = useSelector((state) => state.video.loading);
  const deleted = useSelector((state) => state.video.deleted);
  const updating = useSelector((state) => state.video.updating);
  const updated = useSelector((state) => state.video.updated);
  const [Loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });
  const [videoDetails, setvideoDetails] = useState(null);

  useEffect(() => {
    dispatch(getChannelVideos());

    return () => {
      dispatch(makeChannelVideosEmpty());
    };
  }, [dispatch, uploaded, deleted, updated]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    dispatch(getChannelStats());
  }, [dispatch]);

  const handleDeleteVideo = () => {
    dispatch(deleteAvideo({ videoId: videoDetails?._id }));
    setPopUp((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo,
    }));
  };

  if (Loading) {
    return <BigLoader />;
  }

  return (
    <>
      <Navbar />

      <div id="container" className="  sm:px-2 pt-4">
        {/* uploadVideoPopup */}
        {popUp.uploadVideo && <UploadVideo setUploadVideoPopup={setPopUp} />}

        {/* editVideoPopup */}
        {popUp.editVideo && (
          <div className="w-full flex justify-center top-24 fixed z-20">
            <EditVideo
              setEditVideoPopup={setPopUp}
              title={videoDetails?.title}
              description={videoDetails?.description}
              videoId={videoDetails?._id}
            />
          </div>
        )}

        {/* deleteVideoPopup */}
        {popUp.deleteVideo && (
          <div className="w-full fixed top-52 flex justify-center z-20">
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="text-center sm:p-5 p-3 bg-black border-slate-700 border rounded-xl">
                  <div className="flex justify-center items-start p-3 flex-wrap gap-2 ">
                    <ImBin color="red" size={25} />
                    <div className="flex flex-col flex-wrap items-start">
                      <h1 className="text-bold text-xl mb-1 text-white">
                        Delete Video
                      </h1>
                      <p className="text-xs text-start text-semibold w-60 text-white">
                        <span>Are you sure you want to delete this Video</span>{" "}
                        <span>
                          Once its deleted, you will not be able to recover it.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="font-normal flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        setPopUp((prev) => ({
                          ...prev,
                          deleteVideo: !prev.deleteVideo,
                        }))
                      }
                      className="bg-[#222222] py-1 px-3  rounded-lg sm:text-lg text-sm hover:bg-black cursor-pointer text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteVideo}
                      className="bg-red-500 py-1 px-3 rounded-lg sm:text-lg text-sm hover:opacity-70 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* pop up when video deleting is in process */}
        {deleting && (
          <div className="w-full fixed top-20 flex justify-center z-20">
            <div className="w-52 border border-slate-600 bg-black  gap-2 p-3 flex flex-row items-center">
              <Loader />
              <span className="text-md font-bold text-white">
                Deleting video...
              </span>
            </div>
          </div>
        )}
        {/* pop up when video updating is in process */}

        {updating && (
          <div className="w-full fixed top-20 flex justify-center z-20">
            <div className="w-52 border border-slate-600 bg-black  gap-2 p-3 flex flex-row items-center">
              <Loader />
              <span className="text-md font-bold text-white">
                Updating video...
              </span>
            </div>
          </div>
        )}

        {/* dashboard header */}
        <div className=" flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          {/* username */}
          <div>
            <h1 className="text-white font-bold text-xl sm:text-2xl">{`Welcome Back,${username}`}</h1>
            <p className="text-xs font-light text-slate-400">
              Seamless Video Management,Elevated Results.
            </p>
          </div>

          <div
            onClick={() =>
              setPopUp((prev) => ({
                ...prev,
                uploadVideo: !prev.uploadVideo,
              }))
            }
          >
            <Button
              className="bg-red-500 p-1 sm:p-2 font-semibold text-black hover:scale-110 duration-100 ease-in"
              type="button"
            >
              Upload Video
            </Button>
          </div>
        </div>

        {/* channel stats */}

        <section className="grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2 mt-5">
          <div className="border border-slate-500 sm:p-3 p-2">
            <MdOutlineSlowMotionVideo className="text-red-500 mb-2" size={30} />
            <p className="text-white">Total Videos</p>
            <span className="font-bold text-2xl  text-white">
              {dashboard?.totalVideos}
            </span>
          </div>
          <div className="border border-slate-500 sm:p-3 p-2">
            <FaRegEye className="text-red-500 mb-2" size={30} />
            <p className="text-white">Total Views</p>
            <span className="font-bold text-2xl text-white">
              {dashboard?.totalViews}
            </span>
          </div>
          <div className="border border-slate-500 sm:p-3 p-2">
            <RxAvatar className="text-red-500 mb-2" size={30} />
            <p className="text-white">Total subscribers</p>
            <span className="font-bold text-2xl text-white">
              {dashboard?.totalSubscribers}
            </span>
          </div>
          <div className="border border-slate-500 sm:p-3 p-2">
            <FaRegHeart className="text-red-500 mb-2" size={30} />
            <p className="text-white">Total likes</p>
            <span className="font-bold text-2xl text-white">
              {dashboard?.totalLikes}
            </span>
          </div>
        </section>

        {/* table for managing channel videos */}
        <section className="mx-auto w-full overflow-x-scroll">
          <table className="min-w-full border border-slate-500">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Toggle Publish
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white ">
                  Uploaded
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Toggle CommentSection
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white">
                  Date Uploaded
                </th>
                <th className="py-2 px-4 border-b border-slate-500 text-white"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {videos?.map((video) => (
                <DashboardVideoTable
                  key={video?._id}
                  videoId={video?._id}
                  ispublished={video?.ispublished }
                  commentSection={video?.commentSection}
                  createdAt={video?.createdAt}
                  title={video?.title}
                  setPopUp={setPopUp}
                  setvideoDetails={setvideoDetails}
                  video={video}
                />
              ))}
              {
                console.log("Video ispublished from Collections:", videos?.[0]) // This should be a string/number, not an object
              }
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Collections;
