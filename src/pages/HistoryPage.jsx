import  { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWatchHistory,
  makeHistoryEmpty,
  deleteWatchHistory
} from "../store/slice/userSlice.js";
import { SearchVideoCard } from "../components";
import { MdDelete } from "../components/icons";
import HistoryandSearchPageSkeleton from "../skeletons/HistoryandSearchPageSkeleton";
import NoVideosFound from "../components/NoVideosFound";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.user?.history) || [];
  const user = useSelector((state) => state?.auth?.userData);
  const loading=useSelector((state)=>state?.user?.loading)
  const [Open,setOpen]=useState(false);

  useEffect(() => {
    dispatch(getUserWatchHistory());

    return () => {
      dispatch(makeHistoryEmpty());
    };
  }, []);

  if(loading){
    return <HistoryandSearchPageSkeleton ></HistoryandSearchPageSkeleton>
  }

  if(history && history.length===0){
    return (<NoVideosFound text="Watch history is empty"/>)
  }

  return (
    <>
      <div>
        <div className=" flex flex-row justify-between items-center">
          <h1 className="text-white text-[16px] md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-5 mb-5">
            Watch History
          </h1>
          {/* clear watch history */}
          <div className="flex flex-row gap-2 mr-[10px] md:mr-0 text-white hover:text-red-500 cursor-pointer" onClick={(e)=>{
            e.stopPropagation();
            setOpen(true);

          }}>
            <MdDelete size={24} />
            <span className="text-[16px]">Clear all watch history</span>
          </div>

          {/* dive open when clear watch history gets clicked */}
          <div className={` ${Open?"block":"hidden"} w-[100%] sm:w-[70%] md:w-[80%] lg:w-[70%] xl:w-[50%]  fixed bg-[#212121] z-10 md:left-[150px] lg:left-[200px] xl:left-[350px] top-[270px] p-5  rounded-xl`}>
            <p className="text-white font-semibold">Clear watch history?</p>
            <p className="text-[#AAAAAA] mt-5">
              {`${user.fullname} (${user.email})`}
            </p>
            <p className="text-[#AAAAAA] mt-5">
              Your YouTube watch history will be cleared from all YouTube apps
              on all devices.
            </p>
            <div className="mt-5 flex flex-row justify-end ">
              <div className="flex flex-row gap-5">
                <span className="text-white hover:text-blue-500 cursor-pointer" onClick={(e)=>{
                  e.stopPropagation();
                  setOpen(false);
                }}>Cancel</span>
                <span className="text-red-500 cursor-pointer" onClick={(e)=>{
                  e.stopPropagation();
                  dispatch(deleteWatchHistory());
                  setOpen(false);
                }}>Clear watch history</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {history.map((item) => {
            return (
              <div key={item._id}>
                <SearchVideoCard
                  thumbnail={item.video.thumbnail}
                  duration={item.video.duration}
                  views={item.video.views}
                  title={item.video.title}
                  watchedAt={item.createdAt}
                  createdAt={item?.video?.createdAt}
                  username={item.video.owner.username}
                  avatar={item.video.owner.avatar}
                  ownerId={item.video.owner._id}
                  videoId={item.video._id}
                  description={item.video.description}
                  history="true"
                  _id={item._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
