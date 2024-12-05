import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  tweets: [],
  tweetAddLoading:false,
};

export const createTweet = createAsyncThunk(
  "createTweet",
  async ({ content,owner,likesCount }) => {
    try {
      const response = await axiosInstance.post("tweet/", {
        content,
      });
      toast.success(response.data?.message);
      const createdAt=response.data.data.createdAt;
      const _id=response.data.data._id;
      return {content,owner,likesCount,createdAt,_id};
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getUserTweet = createAsyncThunk(
  "getUserTweet",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`tweet/user/${userId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteTweet = createAsyncThunk(
  "deleteTweet",
  async ({ tweetId }) => {
    try {
     const response= await axiosInstance.delete(`tweet/${tweetId}`);
      toast.success(response.data?.message);
      return { tweetId };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateTweet = createAsyncThunk(
  "updateTweet",
  async ({ tweetId,content }) => {
    try {
      const response = await axiosInstance.patch(`tweet/${tweetId}`,{
        content
      });
      toast.success(response.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    makeTweetsEmpty:(state)=>{
      state.tweets=[]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createTweet.pending, (state) => {
      state.tweetAddLoading = true;
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.tweetAddLoading = false;
      state.tweets.unshift(action.payload);
    });
    builder.addCase(getUserTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserTweet.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
    });
    builder.addCase(deleteTweet.fulfilled, (state, action) => {
      const { tweetId } = action.payload;
      state.loading = false;
      state.tweets = state.tweets.filter((tweet) => tweet._id !== tweetId);
    });
    builder.addCase(updateTweet.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.tweets.findIndex(
        (tweet) => tweet._id === action.payload._id
      );
      const tweet = state.tweets[index];
      const updatedTweet = { ...tweet, content: action.payload.content };
      state.tweets.splice(index, 1, updatedTweet);
    });
  },
});

export const {makeTweetsEmpty}=tweetSlice.actions;



export default tweetSlice.reducer;
