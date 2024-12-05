import React, { useState } from "react";
import { toggleSubscriptions } from "../store/slice/subscriptionSlice.js";
import { Button } from "../components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManageSubscriberCard = ({
  avatar,
  fullname,
  username,
  SubscriptionCount,
  channelId,
  isSubscribed="true"
}) => {
  const [localIsSubscribed, setlocalIsSubscribed] = useState(isSubscribed);
  const [localSubscriptionsCount,setlocalSubscriptionsCount]=useState(SubscriptionCount);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  return (
    <>
      <div className="flex flex-row gap-4 sm:gap-0">
        {/* avatar container */}
        <div className="flex flex-row w-[30%] md:w-[40%]  justify-center ">
          <img
            src={avatar}
            className="w-[100px] h-[100px]   md:w-[136px] md:h-[136px] rounded-full cursor-pointer"
            onClick={(e)=>{
              e.stopPropagation();
              navigate(`/channel/${username}`)
            
            }}
          />
        </div>
        {/* channel info container */}
        <div className=" w-[30%] md:w-[40%] ml-3 flex items-center ">
          <div>
            <h1 className="text-white text-[16px] md:text-[18px] font-semibold ">
              {fullname}
            </h1>
           
            <div className="flex flex-col sm:flex-row text-[#AAAAAA] mt-2 text-[12px] gap-2">
              <span>{`@${username}`}</span>
              <span>{`${localSubscriptionsCount} ${
                localSubscriptionsCount > 1 ? "subscribers" : "subscriber"
              }`}</span>
            </div>
          </div>
        </div>
        {/* subscribe button */}
        <div
          className=" w-[15%] flex justify-center items-center  ml-3 sm:ml-0"
          onClick={(e) => {
            e.stopPropagation();
            setlocalIsSubscribed((prev) => !prev);
            dispatch(toggleSubscriptions({ channelId }));
            if(localIsSubscribed){
              setlocalSubscriptionsCount((prev)=>prev-1);
            }
            else{
              setlocalSubscriptionsCount((prev)=>prev+1);
            }
          }}
        >
          <Button className="text-white font-bold text-[14px] bg-red-500 border-none outline-none h-[36px]  sm:w-[120px] rounded-full sm:p-0 p-1">
            {localIsSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManageSubscriberCard;
