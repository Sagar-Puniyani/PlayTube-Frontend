import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ChannelSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      {/* coverImage */}
      <Skeleton className="sm:h-40 h-28 w-full relative" />

      {/* avatar */}
      <div className=" w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4 ">
        <div className="relative sm:w-32 w-28 sm:h-32 h-28">
          <Skeleton className="rounded-full sm:w-32 w-28 sm:h-32 h-28  absolute sm:bottom-10 bottom-20" />
        </div>
        {/* content */}
        <div className="hidden sm:block">
          <div className="flex flex-col ">
            <Skeleton className="w-[175px]" />
            <Skeleton className="w-[175px]" />
            <Skeleton className="w-[175px]" />
          </div>
        </div>

        <Skeleton className="w-[63px] h-[32px] absolute right-10 hidden sm:block" />
      </div>
    </SkeletonTheme>
  );
};

export default ChannelSkeleton;
