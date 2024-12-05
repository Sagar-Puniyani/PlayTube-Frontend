import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweet,makeTweetsEmpty } from "../../store/slice/tweetSlice.js";
import { BigLoader, TextArea } from "../../components";
import CommentAndReply from "../../components/CommentAndReply";
import { Loader } from "../../components";


const ChannelTweets = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const user=useSelector((state)=>state.user?.profileData);
  const authId = useSelector((state) => state.auth?.userData?._id);
  const Tweets = useSelector((state) => state.tweet?.tweets) || [];
  const tweetAddLoading=useSelector((state)=>state.tweet?.tweetAddLoading);
  const loading=useSelector((state)=>state.tweet?.loading)
  const totalTweets = Tweets.length;
  const isOwner = userId === authId;

  useEffect(() => {
    if (userId) {
      dispatch(getUserTweet({ userId }));
    }

    return()=>{
        dispatch(makeTweetsEmpty());
    }
  }, [dispatch, userId]);

  if(loading){
    return <BigLoader tweet="true"/>
  }



  return (
    <>
      <div className="w-full  flex flex-row justify-center  pt-5">
        <div className=" w-full sm:w-[80%]">
          {/* total tweets */}
          <p className="text-white text-xl font-semibold w-auto ">
            {totalTweets} {totalTweets > 1 ? "Tweets" : "Tweet"}
          </p>

          {/* add a tweet text area */}

          {isOwner && (
            <TextArea
              tweet={true}
              avatarHeight={"40px"}
              avatarWidth={"40px"}
              placeholder="Add a tweet..."
              ButtonText="Tweet"
            />
          )}


          {/* tweets list */}
          <div className="w-full  mt-[20px]  flex flex-col gap-2 ">
          {tweetAddLoading && <Loader/>}
          {Tweets.map((tweet)=>{
            return(

                <CommentAndReply
                    key={tweet?._id}
                    avatar={tweet?.owner?.avatar}
                    username={tweet?.owner?.username}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweet="true"
                    ownersId={tweet?.owner?._id}
                    isLiked={tweet?.isLiked}
                    tweetId={tweet?._id}
                />
            )
          })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelTweets;
