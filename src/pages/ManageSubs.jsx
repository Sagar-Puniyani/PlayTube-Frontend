import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ManageSubscriberCard from "../components/ManageSubscriberCard";
import ManageSubsSkeleton from "../skeletons/ManageSubsSkeleton";
import {
  getSubscribedChannels,
  makemySubscriptionsEmpty,
} from "../store/slice/subscriptionSlice.js";
const ManageSubs = () => {
  const dispatch = useDispatch();
  const subscription =
    useSelector((state) => state.subscription.mySubscriptions) || [];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 1000);
    dispatch(getSubscribedChannels());

    return () => {
      clearTimeout(id);
      dispatch(makemySubscriptionsEmpty());
    };
  }, []);
  
  if (loading) {
    return <ManageSubsSkeleton />;
  }

  return (
    <>
      <div className=" pt-5 flex flex-col gap-10  ">
        {subscription.map((item) => {
          return (
            <ManageSubscriberCard
              key={item?.subscribedChannel?._id}
              avatar={item?.subscribedChannel?.avatar}
              fullname={item.subscribedChannel?.fullname}
              username={item?.subscribedChannel.username}
              SubscriptionCount={
                item?.subscribedChannel?.subscriptionsCount
              }
              channelId={item?.subscribedChannel?._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ManageSubs;
