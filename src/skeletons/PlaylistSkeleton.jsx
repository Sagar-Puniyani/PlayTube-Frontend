import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PlaylistSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      {/* banner */}
      <div className="   flex flex-col  gap-4 lg:p-5  ">
        <Skeleton className=" w-full h-[350px] lg:rounded-xl" />
      </div>
      <div className="flex flex-col  gap-4 p-2 ">
        {/* video container */}
        <div className="flex flex-row items-center  sm:p-2 gap-4  rounded-xl ">
          {/* index */}
          <Skeleton className="hidden sm:block w-[24px] h-[24px]" />

          <Skeleton className="w-[200px] sm:w-[160px] h-[100px] sm:h-[90px] rounded-sm" />

          <div className="flex flex-col gap-2  basis-[80%]  ">
            <Skeleton count={2} />
          </div>
        </div>
        <div className="flex flex-row items-center  sm:p-2 gap-4  rounded-xl ">
          {/* index */}
          <Skeleton className="hidden sm:block w-[24px] h-[24px]" />

          <Skeleton className="w-[200px] sm:w-[160px] h-[100px] sm:h-[90px] rounded-sm" />

          <div className="flex flex-col gap-2  basis-[80%]  ">
            <Skeleton count={2} />
          </div>
        </div>
        <div className="flex flex-row items-center  sm:p-2 gap-4  rounded-xl ">
          {/* index */}
          <Skeleton className="hidden sm:block w-[24px] h-[24px]" />

          <Skeleton className="w-[200px] sm:w-[160px] h-[100px] sm:h-[90px] rounded-sm" />

          <div className="flex flex-col gap-2  basis-[80%]  ">
            <Skeleton count={2} />
          </div>
        </div>
        <div className="flex flex-row items-center  sm:p-2 gap-4  rounded-xl ">
          {/* index */}
          <Skeleton className="hidden sm:block w-[24px] h-[24px]" />

          <Skeleton className="w-[200px] sm:w-[160px] h-[100px] sm:h-[90px] rounded-sm" />

          <div className="flex flex-col gap-2  basis-[80%]  ">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PlaylistSkeleton;
