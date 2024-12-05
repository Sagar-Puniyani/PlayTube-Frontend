import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constant";

const initialState = {
  loading: false,
  commentAddedLoading: false,
  commentDeleteandEditLoading: {},
  comments: [],
  totalComments: 0,
  hasNextPage: false,
};

export const createAComment = createAsyncThunk(
  "createAComment",
  async ({ videoId, content, avatar, username, _id }) => {
    try {
      const response = await axiosInstance.post(`/comment/${videoId}`, {
        content,
      });
      // toast.success(response.data?.message);
      const data = response.data.data;
      return {
        ...data,
        owner: { avatar, username, _id },
        isLiked: false,
        likesCount: 0,
      };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const editAComment = createAsyncThunk(
  "editAComment",
  async ({
    commentId,
    content,
    avatar,
    username,
    _id,
    createdAt,
    likesCount,
    isLiked,
  }) => {
    try {
      const response = await axiosInstance.patch(`/comment/c/${commentId}`, {
        content,
      });
      toast.success(response.data?.message);

      return {
        _id: commentId,
        content,
        owner: { username, avatar, _id },
        createdAt,
        likesCount,
        isLiked,
      };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log(error);
      throw error;
    }
  }
);
export const deleteAComment = createAsyncThunk(
  "deleteAComment",
  async ({ commentId }) => {
    try {
      console.log("runs");
      const response = await axiosInstance.delete(`/comment/c/${commentId}`);
      toast.success(response.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const getVideoComments = createAsyncThunk(
  "getVideoComments",
  async ({ videoId, sortBy, sortType, page = 1 }) => {
    try {
      const url = new URL(`${BASE_URL}/comment/${videoId}`);

      if (page) {
        url.searchParams.set("page", page);
      }
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    makeCommentsEmpty: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAComment.pending, (state) => {
      state.commentAddedLoading = true;
    });
    builder.addCase(createAComment.fulfilled, (state, action) => {
      state.commentAddedLoading = false;
      state.comments.unshift(action.payload);
      state.totalComments++;
    }),
      builder.addCase(createAComment.rejected, (state) => {
        state.commentAddedLoading = false;
      }),
      builder.addCase(deleteAComment.pending, (state, action) => {
        const { commentId } = action.meta.arg;
        state.commentDeleteandEditLoading[commentId] = true;
      });
    builder.addCase(deleteAComment.fulfilled, (state, action) => {
      const { commentId } = action.payload;
      state.commentDeleteandEditLoading[commentId] = false;
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload.commentId
      );
      state.totalComments--;
    }),
      builder.addCase(deleteAComment.rejected, (state, action) => {
        const { commentId } = action.meta.arg;
        state.commentDeleteandEditLoading[commentId] = false;
      });
    builder.addCase(editAComment.pending, (state, action) => {
      const { commentId } = action.meta.arg;
      state.commentDeleteandEditLoading[commentId] = true;
    });
    builder.addCase(editAComment.fulfilled, (state, action) => {
      const { _id } = action.payload;
      state.commentDeleteandEditLoading[_id] = false;
      const index = state.comments.findIndex((comment) => comment._id === _id);
      state.comments.splice(index, 1, action.payload);
      console.log(action.payload);
    });
    builder.addCase(editAComment.rejected, (state, action) => {
      const { commentId } = action.meta.arg;
      state.commentDeleteandEditLoading[commentId] = false;
    });
    builder.addCase(getVideoComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoComments.fulfilled, (state, action) => {
      state.loading = false;
      state.totalComments = action.payload.totalDocs;
      state.hasNextPage = action.payload.hasNextPage;
      state.comments = [...state.comments, ...action.payload.docs];
    });
  },
});
export const { makeCommentsEmpty } = commentSlice.actions;

export default commentSlice.reducer;
