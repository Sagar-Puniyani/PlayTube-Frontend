import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  replies: [],
};

export const createAReply = createAsyncThunk(
  "reply/createAReply",
  async ({ commentId, content, _id, avatar, username,videoId }) => {
    try {
      const response = await axiosInstance.post(`reply/${commentId}/${videoId}`, {
        content,
      });
      toast.success(response.data?.message);
      const data = response.data.data;
      return { ...data, commentId, owner: { _id, avatar, username } };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

// Thunk to get all replies of a comment
export const getAllRepliesOfComment = createAsyncThunk(
  "getAllRepliesOfComment",
  async ({ commentId }) => {
    try {
      const response = await axiosInstance.get(`reply/${commentId}`);
      const data = response.data.data; // Ensure this is an array
      return { replies: data, commentId };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteReply = createAsyncThunk(
  "deleteReply",
  async ({ replyId, commentId }) => {
    try {
      await axiosInstance.delete(`reply/${replyId}`);
      return { replyId, commentId };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const editReply=createAsyncThunk(
  "editReply",
  async({replyId,commentId,content})=>{
    try {
      await axiosInstance.patch(`reply/${replyId}`,{
        content
      })

      return {replyId,commentId,content}
      
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
)

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    makeRepliesEmpty: (state) => {
      state.replies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAReply.fulfilled, (state, action) => {
        const { commentId, content, owner, createdAt, _id } = action.payload;
        const comment = state.replies.find(
          (comment) => comment.commentId === commentId
        );
        if (comment) {
          comment.replies.push({
            content,
            owner,
            createdAt,
            _id,
            likesCount: 0,
            isLiked: false,
          });
        } else {
          state.replies.push({
            commentId,
            replies: [
              {
                content,
                owner,
                createdAt,
                _id,
                likesCount: 0,
                isLiked: false,
              },
            ],
          });
        }
      })
      .addCase(getAllRepliesOfComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRepliesOfComment.fulfilled, (state, action) => {
        state.loading = false;
        const { commentId, replies } = action.payload;
        const existingComment = state.replies.find(
          (comment) => comment.commentId === commentId
        );
        if (existingComment) {
          existingComment.replies = replies;
        } else {
          state.replies.push({
            commentId,
            replies,
          });
        }
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        const { commentId, replyId } = action.payload;
        const comment = state.replies.find(
          (comment) => comment.commentId === commentId
        );
        if (comment) {
          comment.replies = comment.replies.filter(
            (reply) => reply._id !== replyId
          );
        }
      })
      .addCase(editReply.fulfilled, (state, action) => {
        const { commentId, replyId, content } = action.payload;
        const comment = state.replies.find(
          (comment) => comment.commentId === commentId
        );
        if (comment) {
          const reply = comment.replies.find((reply) => reply._id === replyId);
          if (reply) {
            reply.content = content;
          }
        }
      });
  },
});

export const { makeRepliesEmpty } = replySlice.actions;

export default replySlice.reducer;
