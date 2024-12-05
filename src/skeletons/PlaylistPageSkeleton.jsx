import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PlaylistPageSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="text-white pt-5 sm:p-5">
        <div className="flex flex-col gap-1  md:flex md:flex-row flex-wrap  md:gap-20 lg:gap-10">
          <div className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer">
            <div className="absolute w-[90%] top-[8px] h-[166.8px]">
              <Skeleton className="w-full rounded-xl h-[166.8px]" />
            </div>
          </div>
          <div className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer">
            <div className="absolute w-[90%] top-[8px] h-[166.8px]">
              <Skeleton className="w-full rounded-xl h-[166.8px]" />
            </div>
          </div>
          <div className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer">
            <div className="absolute w-[90%] top-[8px] h-[166.8px]">
              <Skeleton className="w-full rounded-xl h-[166.8px]" />
            </div>
          </div>
          <div className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer">
            <div className="absolute w-[90%] top-[8px] h-[166.8px]">
              <Skeleton className="w-full rounded-xl h-[166.8px]" />
            </div>
          </div>
          <div className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer">
            <div className="absolute w-[90%] top-[8px] h-[166.8px]">
              <Skeleton className="w-full rounded-xl h-[166.8px]" />
            </div>
          </div>
          <div className=" md:mb-[50px] sm:basis-[80%]  h-[240px]  md:basis-[40%] lg:basis-[30%]  relative  flex flex-col items-center cursor-pointer">
            <div className="absolute w-[90%] top-[8px] h-[166.8px]">
              <Skeleton className="w-full rounded-xl h-[166.8px]" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PlaylistPageSkeleton;
