import { useState } from "react";
import { ImBin, GrEdit } from "../components/icons";
import { useDispatch } from "react-redux";
import {
  togglePublishStatus,
  toggleCommentSection,
} from "../store/slice/videoSlice.js";
import PropTypes from "prop-types";

const DashboardVideoTable = ({
  videoId,
  ispublished,
  createdAt,
  title,
  commentSection,
  setPopUp,
  setvideoDetails,
  video,
}) => {
  const dispatch = useDispatch();

  const [isChecked, setisChecked] = useState(Boolean(ispublished));
  const [isCommentChecked, setisCommentChecked] = useState(Boolean(commentSection));

  const handleChange = async () => {
    if (!videoId) {
      console.error("Video ID is not defined");
      return;
    }

    await dispatch(togglePublishStatus({ videoId }))
    setisChecked((prev) => !prev);
  };

  const handleCommentChange = () => {
    if (!videoId) {
      console.error("Video ID is not defined");
      return;
    }

    dispatch(toggleCommentSection({ videoId }))
      .then(() => {
        setisCommentChecked((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error toggling comment section:", error);
      });
  };

  return (
    <tr key={videoId}>
      <td className="py-2 px-4 border-b border-slate-500">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isChecked}
            onChange={handleChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>{" "}
      </td>
      <td className="py-2 px-4 border-b border-slate-500 ">
        {isChecked ? (
          <span className="text-green-500 py-1 px-2 border border-green-500 rounded-full">
            Published
          </span>
        ) : (
          <span className="text-orange-500 py-1 px-2 border border-orange-500 rounded-full">
            UnPublished
          </span>
        )}
      </td>
      <td className="py-2 px-4 border-b border-slate-500 text-white">
        {title}
      </td>
      <td className="border-b border-slate-500">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isCommentChecked}
            onChange={handleCommentChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>{" "}
      </td>
      <td className="py-2 px-4 border-b border-slate-500 text-white">
        {createdAt?.day ?? "N/A"}/{createdAt?.month ?? "N/A"}/
        {createdAt?.year ?? "N/A"}
      </td>
      <td className="py-2 border-b border-slate-500 text-white">
        <span className="flex gap-3 justify-start">
          <ImBin
            size={20}
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => {
              e.preventDefault();
              setPopUp((prev) => ({
                ...prev,
                deleteVideo: !prev.deleteVideo,
              }));
              setvideoDetails(video);
            }}
          />
          <GrEdit
            size={20}
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => {
              e.preventDefault();
              setPopUp((prev) => ({
                ...prev,
                editVideo: !prev.editVideo,
              }));
              setvideoDetails(video);
            }}
          />
        </span>
      </td>
    </tr>
  );
};

DashboardVideoTable.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  ispublished: PropTypes.bool.isRequired,
  commentSection: PropTypes.bool.isRequired,
  setPopUp: PropTypes.func.isRequired,
  setvideoDetails: PropTypes.func.isRequired,
};

export default DashboardVideoTable;
