import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constant";

const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
  deleted: false,
  show: false,
  updating: false,
  updated: false,
};

export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
      const url = new URL(`${BASE_URL}/video`);
      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response = await axiosInstance.get(url);
      console.log("response from getAllVideos" ,  response);  
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getVideoById = createAsyncThunk(
  "getVideoById",
  async ({ videoId }) => {
    try {
      // // fetch video details
      const response = await axiosInstance.get(`/video/v/${videoId}`);

      // increment view count
      axiosInstance.post(`/video/v/${videoId}`);

      // add video to watch history
      axiosInstance.post(`/video/v/wh/${videoId}`);

      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  "togglePublishStatus",
  async ({ videoId }) => {
    try {
      const response = await axiosInstance.patch(
        `/video/toggle/publish/${videoId}`
      );
      console.log("response from togglePublishStatus" ,  response);
      toast.success(response.data.message.message);
      return response.data.data.ispublished;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";
      toast.error(
        typeof errorMessage === "string"
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
      throw error;
    }
  }
);

export const toggleCommentSection = createAsyncThunk(
  "toggleCommentSection",
  async ({ videoId }) => {
    try {
      const response = await axiosInstance.patch(
        `/video/toggle/comment/${videoId}`
      );
      // console.log("response from toggleCommentSection" ,  response);
      toast.success(response.data.message.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const publishVideo = createAsyncThunk("publishVideo", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("videoFile", data.videoFile[0]);
  formData.append("thumbnail", data.thumbnail[0]);

  try {
    const response = await axiosInstance.post("/video", formData);
    toast.success(response?.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const deleteAvideo = createAsyncThunk(
  "deleteAvideo",
  async ({ videoId }) => {
    try {
      const response = await axiosInstance.delete(`/video/v/${videoId}`);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateAVideo = createAsyncThunk(
  "updateAVideo",
  async ({ videoId, data }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await axiosInstance.patch(
        `/video/v/${videoId}`,
        formData
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
    makeVideoNull: (state) => {
      state.video = null;
    },
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
    updateShow: (state) => {
      state.show = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos.docs = [...state.videos.docs, ...action.payload.docs];
      state.videos.hasNextPage = action.payload.hasNextPage;
    });
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
    });
    builder.addCase(publishVideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(publishVideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
      state.show = true;
    });
    builder.addCase(deleteAvideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAvideo.fulfilled, (state) => {
      state.loading = false;
      state.deleted = true;
    });
    builder.addCase(updateAVideo.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateAVideo.fulfilled, (state) => {
      state.updating = false;
      state.updated = true;
    });
  },
});

export const { makeVideosNull, makeVideoNull, updateUploadState, updateShow } =
  videoSlice.actions;

export default videoSlice.reducer;
