import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const SubscriptionsSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="   flex flex-col gap-2  sm:flex sm:flex-row  flex-wrap  sm:gap-5  lg:gap-4 xl:gap-4  mt-[60px]">
        <div className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] ">
          <Skeleton className="w-full h-[224px] sm:rounded-xl" />
          <div
            id="content-container"
            className="mt-3 flex flex-row gap-4 items-center w-full"
          >
            <Skeleton className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0" />
            <div className="flex flex-col">
              <Skeleton className="w-[340px] h-[15px]" />
              <Skeleton className="w-[340px] h-[15px]" />
            </div>
          </div>
        </div>
        <div className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] ">
          <Skeleton className="w-full h-[224px] sm:rounded-xl" />
          <div
            id="content-container"
            className="mt-3 flex flex-row gap-4 items-center w-full"
          >
            <Skeleton className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0" />
            <div className="flex flex-col">
              <Skeleton className="w-[340px] h-[15px]" />
              <Skeleton className="w-[340px] h-[15px]" />
            </div>
          </div>
        </div>
        <div className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] ">
          <Skeleton className="w-full h-[224px] sm:rounded-xl" />
          <div
            id="content-container"
            className="mt-3 flex flex-row gap-4 items-center w-full"
          >
            <Skeleton className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0" />
            <div className="flex flex-col">
              <Skeleton className="w-[340px] h-[15px]" />
              <Skeleton className="w-[340px] h-[15px]" />
            </div>
          </div>
        </div>
        <div className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] ">
          <Skeleton className="w-full h-[224px] sm:rounded-xl" />
          <div
            id="content-container"
            className="mt-3 flex flex-row gap-4 items-center w-full"
          >
            <Skeleton className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0" />
            <div className="flex flex-col">
              <Skeleton className="w-[340px] h-[15px]" />
              <Skeleton className="w-[340px] h-[15px]" />
            </div>
          </div>
        </div>
        <div className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] ">
          <Skeleton className="w-full h-[224px] sm:rounded-xl" />
          <div
            id="content-container"
            className="mt-3 flex flex-row gap-4 items-center w-full"
          >
            <Skeleton className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0" />
            <div className="flex flex-col">
              <Skeleton className="w-[340px] h-[15px]" />
              <Skeleton className="w-[340px] h-[15px]" />
            </div>
          </div>
        </div>
        <div className=" relative h-[340px] cursor-pointer basis-[95%] sm:basis-[90%] md:basis-[48%] lg:basis-[32%] ">
          <Skeleton className="w-full h-[224px] sm:rounded-xl" />
          <div
            id="content-container"
            className="mt-3 flex flex-row gap-4 items-center w-full"
          >
            <Skeleton className="w-[50px] h-[50px] rounded-full mb-7 sm:mb-0" />
            <div className="flex flex-col">
              <Skeleton className="w-[340px] h-[15px]" />
              <Skeleton className="w-[340px] h-[15px]" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SubscriptionsSkeleton;
