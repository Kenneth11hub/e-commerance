import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePassword,
  login,
  update,
  upload,
  validateRefresh,
} from "../services";

const theme = JSON.parse(localStorage.getItem("theme")),
  token = localStorage.getItem("token"),
  maxPage = Number(localStorage.getItem("maxPage"));

const initialState = {
  auth: {},
  token,
  maxPage: maxPage || 6,
  pos: "",
  theme: theme || {
    dark: false,
    bg: "bg-light",
    text: "text-dark",
    skin: "light-skin",
    topbar: "light-topbar",
    skinText: "text-dark",
    color: "light",
    hex: "#1266F1",
    border: "black",
    borderHex: "#262626",
  },
  progress: 0,
  isSuccess: false,
  didChange: false,
  isLoading: false,
};

export const LOGIN = createAsyncThunk("auth/login", (user, thunkAPI) => {
  try {
    return login(user.email, user.password);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const REFRESH = createAsyncThunk(
  "auth/validateRefresh",
  (token, thunkAPI) => {
    try {
      return validateRefresh(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UPDATE = createAsyncThunk(
  "auth/update",
  async (data, thunkAPI) => {
    try {
      return await update("users", data.user.form, data.user.id, data.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const CHANGEPASSWORD = createAsyncThunk(
  "auth/password/change",
  async (data, thunkAPI) => {
    try {
      return await changePassword("auth", data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UPLOAD = createAsyncThunk("auth/file", async (data, thunkAPI) => {
  try {
    return await upload(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    THEME: (state, data) => {
      let theme;
      if (data.payload) {
        theme = {
          dark: true,
          bg: "bg-dark",
          bgHex: "#d5d4d5",
          text: "text-white",
          skin: "dark-skin",
          skinText: "text-white",
          topbar: "dark-topbar",
          color: "dark",
          hex: "#FFA900",
          border: "white",
          borderHex: "#FBFBFB",
        };
      } else {
        theme = {
          dark: false,
          bg: "bg-light",
          bgHex: "#FBFBFB",
          text: "text-dark",
          skin: "light-skin",
          topbar: "light-topbar",
          skinText: "text-dark",
          color: "light",
          hex: "#1266F1",
          border: "black",
          borderHex: "#262626",
        };
      }
      state.theme = theme;
      localStorage.setItem("theme", JSON.stringify(theme));
    },
    POS: (state, data) => {
      state.pos = data.payload;
    },
    RESET: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.progress = 0;
      state.auth = {};
      state.token = "";
    },
    PROGRESS: (state, data) => {
      state.progress = data.payload;
    },
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(LOGIN.pending, state => {
        state.isLoading = true;
      })
      .addCase(LOGIN.fulfilled, (state, action) => {
        // state.auth = action.payload.user;
        // state.token = action.payload.token;
        state.isSuccess = true;
        state.isLoading = true;
        state.didChange = false;
      })
      .addCase(LOGIN.rejected, (state, action) => {
        state.isLoading = false;
      })

      // VALIDATE USER ON REFRESH
      .addCase(REFRESH.pending, state => {
        state.isLoading = true;
      })
      .addCase(REFRESH.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.isLoading = false;
      })
      .addCase(REFRESH.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(UPDATE.pending, state => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.auth = action.payload;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(CHANGEPASSWORD.pending, state => {
        state.isLoading = true;
      })
      .addCase(CHANGEPASSWORD.fulfilled, (state, action) => {
        state.didChange = true;
        state.isLoading = false;
      })
      .addCase(CHANGEPASSWORD.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { RESET, THEME, PROGRESS, POS } = authSlice.actions;

export default authSlice.reducer;
