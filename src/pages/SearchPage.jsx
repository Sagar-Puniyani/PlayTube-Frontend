import  {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams,useParams } from "react-router-dom";
import { getAllVideos, makeVideosNull } from "../store/slice/videoSlice.js";
import { FaFilter, IoCloseCircleOutline } from "../components/icons";
import { SearchVideoCard } from "../components";
import HistoryandSearchPageSkeleton from "../skeletons/HistoryandSearchPageSkeleton";
import NoVideosFound from "../components/NoVideosFound";


 const SearchPage = () => {
  const [filterOpen,setFilterOpen] = useState(false);
  const { query } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos?.docs);
  const loading=useSelector((state)=>state.video?.loading);
  const[searchParms,setSearchParms]=useSearchParams();


  useEffect(() => {
    const sortType=searchParms.get("sortType");
    const sortBy=searchParms.get("sortBy");
    dispatch(getAllVideos({ query,sortBy,sortType }));
    return () => {
      dispatch(makeVideosNull());
    };
  }, [dispatch, query,searchParms]);

  const handleSortParams=(newSortBy,newSortType="asc")=>{
    setSearchParms({sortBy:newSortBy,sortType:newSortType})
  }

if(loading){
  return( <HistoryandSearchPageSkeleton search="true"></HistoryandSearchPageSkeleton>)
}

if(videos && videos.length===0){
  return (<NoVideosFound text="Try searching something else" />)
}


  return (
    <>
      {/* filter icon */}
      <div className="w-full  flex items-center font-bold justify-end cursor-pointer px-8" onClick={(e)=>{
        e.stopPropagation();
        setFilterOpen((prev)=>!prev)
      }}>
        <span className="text-white hover:text-red-500">Filters</span>
        <FaFilter size={20} className="text-red-500 hover:text-red-800" />
      </div>

      {/* filter popup */}
      <div
        className={`${filterOpen ? "block" :"hidden"} sm:rounded-xl w-[100%] top-[125px] sm:w-[80%]  md:w-[70%] sm:top-[150px] sm:left-[135px] lg:w-[50%] h-[313px]  fixed bg-[#212121] z-10 md:top-[149px] md:left-[175px] lg:top-[149px] lg:left-[350px] xl:top-[149px] xl:left-[552px] pt-[20px] p-[10px]`}
      >
        <h1 className="text-white font-bold text-xl">Search Filters</h1>
        <div className="ml-[6px] sm:ml-[0px] flex flex-row gap-4 sm:gap-10 ">
          <div className="  basis-[30%]">
            <h2 className="text-white inline-block  font-medium  p-[10px]   border-b">
              Upload Date
            </h2>
            <ul className="text-slate-400 mt-3 ml-4 cursor-pointer">
              <li onClick={(e)=>{
                e.stopPropagation();
                handleSortParams("createdAt","desc")
              }}>Latest</li>
              <li onClick={(e)=>{
                e.stopPropagation();
                handleSortParams("createdAt","asc")
              }} >Oldest</li>
            </ul>
          </div>
          <div className="basis-[30%]">
            <h2 className="inline-block text-white font-medium p-[10px]   border-b">
              View Count
            </h2>
            <ul className="text-slate-400 mt-3  cursor-pointer">
              <li onClick={(e)=>{
                e.stopPropagation();
                handleSortParams("views","asc")
              }} >Low To High</li>
              <li onClick={(e)=>{
                e.stopPropagation();
                handleSortParams("views","desc")
              }}>High To Low</li>
            </ul>
          </div>
          <div className="basis-[30%]">
            <h2 className=" inline-block text-white font-medium p-[10px]   border-b">
              Duration
            </h2>
            <ul className="text-slate-400 mt-3  cursor-pointer">
              <li onClick={(e)=>{
                e.stopPropagation();
                handleSortParams("duration","asc")
              }}>Low To High</li>
              <li onClick={(e)=>{
                e.stopPropagation();
                handleSortParams("duration","desc")
              }} >High To Low</li>
            </ul>
          </div>
        </div>
        <div className="absolute top-4 right-4 cursor-pointer">
          <IoCloseCircleOutline onClick={(e)=>{
            e.stopPropagation();
            setFilterOpen((prev)=>!prev)
          }} size={25} color="white" />
        </div>
      </div>

      {/* search videos contianer */}
      <div
        id="search-container"
        className="flex flex-col gap-1 sm:gap-3 mt-[20px]"
      >
        {
          console.log("videos",videos)
        }
        {videos?.map((items) => (
         <SearchVideoCard
            duration={items.duration}
            thumbnail={items.thumbnail}
            username={items.owner.username}
            description={items.description}
            createdAt={items.createdAt}
            avatar={items.owner.avatar}
            key={items._id}
            title={items.title}
            videoId={items._id}
            views={items.views}
            ownerId={items.owner._id}
          />
        ))}
      </div>
    </>
  );
};
export default SearchPage