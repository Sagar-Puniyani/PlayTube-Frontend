import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SignupSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="className='w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8'">
        <div
          id="container"
          className="border border-slate-600 p-3 flex flex-col items-center space-y-2  w-[409.6px] sm:mt-4 md:mt-8 "
        >
          <div className="flex items-center gap-2">
            <Skeleton height={30} width={30} />
            <Skeleton height={24} width={72} />
          </div>
          <div className="space-y-4 p-2 text-sm sm:w-96 w-full ">
            <div className="w-full relative h-28 bg-[#222222] mb-2">
              <Skeleton className="w-full h-full" />
            </div>

            <Skeleton height={20} width={70} className="mb-1" />

            <Skeleton height={32} width="100%" className="mb-2" />

            <Skeleton height={20} width={70} className="mb-1" />

            <Skeleton height={32} width="100%" className="mb-2" />

            <Skeleton height={20} width={70} className="mb-1" />

            <Skeleton height={32} width="100%" className="mb-2" />

            <Skeleton height={20} width={70} className="mb-1" />

            <Skeleton height={32} width="100%" className="mb-2" />

            <div>
              <Skeleton height={57} width="100%" />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Skeleton height={20} width={157} />
            <Skeleton height={20} width={30} className="ml-2"></Skeleton>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
