import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const HomePageSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[45%] lg:basis-[32%]">
        <div id="thumbnail-container" className="relative">
          <Skeleton className="sm:rounded-xl w-full h-[224px]" />
        </div>
        <div
          id="content-container"
          className="mt-3 flex flex-row gap-2 items-center"
        >
          <div id="avatar" className="w-[50px] h-[50px]  ">
            <Skeleton
              circle={true}
              className=" w-[50px] h-[50px] mb-2 sm:mb-0 "
            />
          </div>
          <div id="content" className="w-[83%] ">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
