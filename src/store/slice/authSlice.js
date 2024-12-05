import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  status: false,
  userData: null,
  updating: false,
};

export const createAccount = createAsyncThunk("register", async (data) => {
  console.log("data from authSlice : ", data);
  const formData = new FormData();
  formData.append("avatar", data.avatar[0]);
  formData.append("coverImage", data.coverImage[0]);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullname", data.fullname);
  console.log("Logging FormData contents:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  try {
    const response = await axiosInstance.post("/users/register", formData);
    console.log(" response form authSlice : ", response);
    toast.success("Registered succesfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post("/users/login", data);
    toast.success(response.data?.message);
    return response.data.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    // toast.success(response.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk(
  "refreshAcessToken",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token", data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/getCurrentUser");
  return response.data.data;
});

export const updateUserAvatar = createAsyncThunk(
  "updateUserAvatar",
  async (avatar) => {
    try {
      const response = await axiosInstance.patch("/users/avatar", avatar);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const updateCoverImage = createAsyncThunk(
  "updateCoverImage",
  async (coverImage) => {
    try {
      const response = await axiosInstance.patch(
        "/users/cover-image",
        coverImage
      );
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/users/change-password", data);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateAccountDetails = createAsyncThunk(
  "updateAccountDetails",
  async (data) => {
    try {
      const response = await axiosInstance.patch("/users/update-account", data);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  register user Thunk
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createAccount.rejected, (state) => {
      state.loading = false;
    });

    // login user Thunk
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });

    // logout user Thunk
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });

    // getting current user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });

    // update user avatar
    builder.addCase(updateUserAvatar.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateUserAvatar.fulfilled, (state, action) => {
      state.updating = false;
      state.userData = action.payload;
    });
    builder.addCase(updateUserAvatar.rejected, (state) => {
      state.updating = false;
    });

    // update cover image
    builder.addCase(updateCoverImage.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateCoverImage.fulfilled, (state, action) => {
      state.updating = false;
      state.userData = action.payload;
    });
    builder.addCase(updateCoverImage.rejected, (state) => {
      state.updating = false;
    });

    // changing account details
    builder.addCase(updateAccountDetails.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateAccountDetails.fulfilled, (state, action) => {
      state.updating = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAccountDetails.rejected, (state) => {
      state.updating = false;
    });
  },
});

export default authSlice.reducer;
