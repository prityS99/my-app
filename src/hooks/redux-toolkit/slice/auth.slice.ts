import axiosInstance from "@/lib/axiosIntance";
import { endpoint } from "@/services/helper/endpoint";
import { AuthState } from "@/typescript/interface/auth.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { toast } from "sonner";
import Cookies from "js-cookie";

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   status: "idle",
//   error: null,
// };
const getInitialState = (): AuthState => {
  const token = Cookies.get("token");
  const userString = Cookies.get("authUser");
  let user = null;
  try {
    if (userString) {
      user = JSON.parse(userString);
      console.log("after user details added", user);
    }
  } catch (e) {
    console.error("Could not parse user data from cookie:", e);
  }
  return {
    user: user,
    token: token || null,
    isAuthenticated: !!token,
    status: "idle",
    error: null,
  };
};
const initialState: AuthState = getInitialState();

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (
    data: {
      name: string;
      email: string;
      password: string;
      mobile: string;
      first_school: string;
      image: FileList;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("async thunk data", data);
      const { image, ...restData } = data;
      const formData = new FormData();
      Object.entries(restData).forEach(([Key, value]) => {
        formData.append(Key, value as string);
      });
      if (image && image.length > 0) {
        formData.append("image", image[0]);
      }
      const response = await axiosInstance.post(
        `${endpoint.auth.signup}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("async thunk response", response);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      console.log("create astnc thunk", response);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      Cookies.remove("token");
      Cookies.remove("authUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        Cookies.set("token", action.payload.token, { expires: 7 });
        Cookies.set("authUser", JSON.stringify(action.payload.user));
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
        Cookies.remove("token");
        Cookies.remove("authUser");
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        Cookies.set("token", action.payload.token, { expires: 7 });
        Cookies.set("authUser", JSON.stringify(action.payload.user), {
          expires: 7,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
        Cookies.remove("token");
        Cookies.remove("authUser");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
