import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserChannelSubscribers,
  makeChannelSubscribersEmpty,
} from "../../store/slice/subscriptionSlice.js";
import ManageSubscriberCard from "../../components/ManageSubscriberCard";
import ManageSubsSkeleton from "../../skeletons/ManageSubsSkeleton";
import NoVideosFound from "../../components/NoVideosFound";

const ChannelSubscribers = () => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.user?.profileData?._id);
  const channelSubscribers = useSelector(
    (state) => state.subscription?.channelSubscribers
  );
  const loading = useSelector((state) => state.subscription.loading);
  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelSubscribers({ channelId }));
    }
    return () => {
      dispatch(makeChannelSubscribersEmpty());
    };
  }, [channelId]);


  if(loading){
    return (<ManageSubsSkeleton/>)
  }



  if (channelSubscribers && channelSubscribers.length === 0) {
    return <NoVideosFound text="No subscribers found" />;
  }

  return (
    <>
      <div className=" pt-5 flex flex-col gap-10  ">
        {channelSubscribers.map((item) => {
          return (
            <ManageSubscriberCard
              key={item?.subscribers?._id}
              avatar={item?.subscribers?.avatar}
              fullname={item?.subscribers?.fullname}
              username={item?.subscribers?.username}
              SubscriptionCount={item?.subscribers?.subscriptionCount}
              channelId={item?.subscribers?._id}
              isSubscribed={item?.subscribers?.subscribedToSubscriber}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChannelSubscribers;
