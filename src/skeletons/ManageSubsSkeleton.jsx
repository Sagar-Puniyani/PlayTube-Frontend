import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const ManageSubsSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className=" pt-5 flex flex-col gap-10  ">
        <div className="flex flex-row gap-4 sm:gap-0">
          <div className="flex flex-row w-[30%] md:w-[40%]  justify-center ">
            <Skeleton className="w-[100px] h-[100px]   md:w-[136px] md:h-[136px] rounded-full" />
          </div>
          <div className=" w-[30%] md:w-[40%] ml-3 flex items-center ">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
            </div>
          </div>

          <div className=" w-[15%] flex justify-center items-center  ml-3 sm:ml-0">
            <Skeleton className="h-[36px] w-[80px] sm:w-[120px] rounded-full sm:p-0 p-1" />
          </div>
        </div>
        <div className="flex flex-row gap-4 sm:gap-0">
          <div className="flex flex-row w-[30%] md:w-[40%]  justify-center ">
            <Skeleton className="w-[100px] h-[100px]   md:w-[136px] md:h-[136px] rounded-full" />
          </div>
          <div className=" w-[30%] md:w-[40%] ml-3 flex items-center ">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
            </div>
          </div>

          <div className=" w-[15%] flex justify-center items-center  ml-3 sm:ml-0">
            <Skeleton className="h-[36px] w-[80px] sm:w-[120px] rounded-full sm:p-0 p-1" />
          </div>
        </div>
        <div className="flex flex-row gap-4 sm:gap-0">
          <div className="flex flex-row w-[30%] md:w-[40%]  justify-center ">
            <Skeleton className="w-[100px] h-[100px]   md:w-[136px] md:h-[136px] rounded-full" />
          </div>
          <div className=" w-[30%] md:w-[40%] ml-3 flex items-center ">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
            </div>
          </div>

          <div className=" w-[15%] flex justify-center items-center  ml-3 sm:ml-0">
            <Skeleton className="h-[36px] w-[80px] sm:w-[120px] rounded-full sm:p-0 p-1" />
          </div>
        </div>
        <div className="flex flex-row gap-4 sm:gap-0">
          <div className="flex flex-row w-[30%] md:w-[40%]  justify-center ">
            <Skeleton className="w-[100px] h-[100px]   md:w-[136px] md:h-[136px] rounded-full" />
          </div>
          <div className=" w-[30%] md:w-[40%] ml-3 flex items-center ">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
              <Skeleton className="w-[100px]  sm:w-[150px] h-[27px]" />
            </div>
          </div>

          <div className=" w-[15%] flex justify-center items-center  ml-3 sm:ml-0">
            <Skeleton className="h-[36px] w-[80px] sm:w-[120px] rounded-full sm:p-0 p-1" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ManageSubsSkeleton;
