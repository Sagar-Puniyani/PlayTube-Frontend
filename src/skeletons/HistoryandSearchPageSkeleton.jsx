import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import PropTypes from "prop-types";

const HistoryandSearchPageSkeleton = ({ search }) => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div>
        <div
          className={`${
            search ? "hidden" : "block"
          }  flex flex-row justify-between items-center`}
        >
          <Skeleton className=" w-[134px] md:w-[160px] lg:w-[200px] xl:w-[241px] h-[40px] mt-5 mb-5" />
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col gap-5">
            <div className="w-full  md:h-[280.55px] sm:flex sm:flex-col  md:flex md:flex-row  md:gap-3 cursor-pointer relative">
              <div className="h-[200px] sm:h-[350px] md:basis-[60%] lg:basis-[40%] md:h-full  relative">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-[5px] sm:p-[10px] md:p-[0px]  flex flex-row gap-4  md:basis-[40%] lg:basis-[60%] md:flex md:flex-col md:gap-2">
                <Skeleton count={2} className="h-[40px]" />
                <div className="flex flex-row gap-2 items-center">
                  <Skeleton circle={true} className="w-[40px] h-[40px]" />
                  <Skeleton className="w-[100px] h-[20px]" />
                </div>
                <Skeleton className="h-[40px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="w-full  md:h-[280.55px] sm:flex sm:flex-col  md:flex md:flex-row  md:gap-3 cursor-pointer relative">
              <div className="h-[200px] sm:h-[350px] md:basis-[60%] lg:basis-[40%] md:h-full  relative">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-[5px] sm:p-[10px] md:p-[0px]  flex flex-row gap-4  md:basis-[40%] lg:basis-[60%] md:flex md:flex-col md:gap-2">
                <Skeleton count={2} className="h-[40px]" />
                <div className="flex flex-row gap-2 items-center">
                  <Skeleton circle={true} className="w-[40px] h-[40px]" />
                  <Skeleton className="w-[100px] h-[20px]" />
                </div>
                <Skeleton className="h-[40px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

HistoryandSearchPageSkeleton.propTypes = {
  search: PropTypes.bool,
};

export default HistoryandSearchPageSkeleton;
