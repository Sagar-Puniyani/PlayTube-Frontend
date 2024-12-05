import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  videos: [],
  playlists: [],
  PlaylistName:null,
  PlaylistId:null,

};

export const createPlaylist = createAsyncThunk(
  "createPlaylist",
  async ( name ) => {
    try {
      const response = await axiosInstance.post("/playlist/", {
        name,
      });
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async ({ playlistId }) => {
    try {
      const response = await axiosInstance.delete(`/playlist/${playlistId}`);
      toast.success(response.data.message);
      return { playlistId };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  "addVideoToPlaylist",
  async ({ videoId, playlistId,PlaylistName }) => {
    try {
      const response = await axiosInstance.patch(
        `/playlist/add/${videoId}/${playlistId}`
      );
      toast.success(`Saved To ${PlaylistName}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteVideoFromPlaylist = createAsyncThunk(
  "deleteVideoFromPlaylist",
  async ({ playlistId, videoId,PlaylistName }) => {
    try {
       await axiosInstance.patch(
        `/playlist/remove/${videoId}/${playlistId}`
      );
      toast.success(`Removed From ${PlaylistName}`);
      return { videoId };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getPlaylistById = createAsyncThunk(
  "getPlaylistById",
  async ({ playlistId }) => {
    try {
      const response = await axiosInstance.get(`/playlist/${playlistId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getUserPlaylist = createAsyncThunk(
  "getUserPlaylist",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`/playlist/user/${userId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    makeVideosEmpty:(state)=>{
      state.videos=[];
      state.PlaylistName=null;
      state.PlaylistId=null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPlaylist.fulfilled, (state, action) => {
      state.loading = false;
      state.playlists.push(action.payload);
    });
    builder.addCase(deletePlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlaylist.fulfilled, (state, action) => {
      state.loading = false;
      const { playlistId } = action.payload;
      state.playlists = state.playlists.filter(
        (item) => item._id !== playlistId
      );
    });
    builder.addCase(addVideoToPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVideoToPlaylist.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteVideoFromPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideoFromPlaylist.fulfilled, (state,action) => {
      state.loading = false;
      const { videoId } = action.payload;
      state.videos = state.videos.filter((video) => video?.video?._id !== videoId);
    });
    builder.addCase(getPlaylistById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlaylistById.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload[0].videos;
      state.PlaylistName=action.payload[0].name;
      state.PlaylistId=action.payload[0]._id;
    });
    builder.addCase(getUserPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPlaylist.fulfilled, (state, action) => {
      state.loading = false;
      state.playlists = action.payload;
    });
  },
});

export const {makeVideosEmpty}=playlistSlice.actions;

export default playlistSlice.reducer;
