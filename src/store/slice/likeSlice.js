import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  likedVideos: [],
};

export const toggleVideoLike = createAsyncThunk(
  "toggleVideoLike",
  async ({ videoId }) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const toggleTweetLike = createAsyncThunk(
  "toggleTweetLike",
  async ({ tweetId }) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  "toggleCommentLike",
  async ({ commentId,videoId }) => {
    try {
      const response = await axiosInstance.post(`likes/toggle/c/${commentId}/${videoId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const toggleReplyLike = createAsyncThunk(
  "toggleReplyLike",
  async ({ replyId,videoId }) => {
    try {
      const response = await axiosInstance.post(`likes/toggle/r/${replyId}/${videoId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  try {
    const response = await axiosInstance.get("likes/videos");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const deletLikedVideo = createAsyncThunk("deletLikedVideo", async ({videoId}) => {
  try {
    await axiosInstance.post(`/likes/toggle/v/${videoId}`);
    return {videoId};
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    makeLikedVideosEmpty: (state) => {
      state.likedVideos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLikedVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLikedVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.likedVideos = action.payload;
    });
    builder.addCase(deletLikedVideo.pending,(state)=>{
      state.loading=true;
    })
    builder.addCase(deletLikedVideo.fulfilled,(state,action)=>{
      const {videoId}=action.payload;
      state.loading=false;
      state.likedVideos=state.likedVideos.filter((item)=>item?.likedVideo?._id!==videoId);

  })
  },
});

export const { makeLikedVideosEmpty } = likeSlice.actions;

export default likeSlice.reducer;
