import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slice/authSlice.js";
import videoSliceReducer from "./slice/videoSlice.js";
import likeSliceReducer from "./slice/likeSlice.js";
import commentSliceReducer from "./slice/commentSlice.js";
import subscriptionSliceReducer from "./slice/subscriptionSlice.js";
import replySliceReducer from "./slice/replySlice.js";
import playlistSliceReducer from "./slice/playlistSlice.js";
import userSliceReducer from "./slice/userSlice.js";
import dashboardSliceReducer from "./slice/dashboardSlice.js";
import tweetSliceReducer from "./slice/tweetSlice.js";

const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        video : videoSliceReducer,
        like:likeSliceReducer,
        comment:commentSliceReducer,
        subscription:subscriptionSliceReducer,
        reply:replySliceReducer,
        playlist:playlistSliceReducer,
        user:userSliceReducer,
        dashboard:dashboardSliceReducer,
        tweet:tweetSliceReducer
    },
})

export default store;