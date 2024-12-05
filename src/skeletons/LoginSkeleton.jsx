import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LoginSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="w-full  text-white p-3 flex justify-center items-start sm:mt-8 ">
        <div
          id="container"
          className="border border-slate-600 p-3 flex flex-col items-center space-y-2  w-[409.6px] mt-[80px]"
        >
          <div className="flex items-center gap-2">
            <Skeleton height={30} width={30} />
            <Skeleton height={24} width={72} />
          </div>
          <div className="space-y-4 p-2 text-sm sm:w-96 w-full ">
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
