import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  history: [],
  profileData: null,
  profileLoading:false,
};

export const getUserWatchHistory = createAsyncThunk(
  "getUserWatchHistory",
  async () => {
    try {
      const response = await axiosInstance.get("users/history");
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteVideoFromWatchHistory = createAsyncThunk(
  "deleteVideoFromWatchHistory",
  async ({ id }) => {
    try {
      await axiosInstance.delete(`video/v/wh/${id}`);
      return { id };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteWatchHistory = createAsyncThunk(
  "deleteWatchHistory",
  async () => {
    try {
      const response = await axiosInstance.delete("users/history");
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getUserChannelProfile = createAsyncThunk(
  "getUserChannelProfile",
  async ({username}) => {
    try {
      const response=await axiosInstance.get(`users/c/${username}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    makeHistoryEmpty: (state) => {
      state.history = [];
    },
    makeProfileDataNull:(state)=>{
      state.profileData=null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserWatchHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserWatchHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = action.payload;
    });
    builder.addCase(deleteVideoFromWatchHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideoFromWatchHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = state.history.filter(
        (item) => item._id !== action.payload.id
      );
    });
    builder.addCase(deleteWatchHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteWatchHistory.fulfilled, (state) => {
      state.loading = false;
      state.history = [];
    });
    builder.addCase(getUserChannelProfile.pending,(state)=>{
      state.profileLoading=true;
    });
    builder.addCase(getUserChannelProfile.fulfilled,(state,action)=>{
      state.profileLoading=false;
      state.profileData=action.payload;
    })

  },
});

export const { makeHistoryEmpty,makeProfileDataNull } = userSlice.actions;

export default userSlice.reducer;
