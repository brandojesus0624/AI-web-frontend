import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../authHeader";

const baseUrl = "https://avatar-service-test-hwj6miv7nq-uc.a.run.app/";

export const getUser = createAsyncThunk("authentication/getUser", async () => {
  const item = window.localStorage.getItem("userData");
  const authData = item ? JSON.parse(item) : {};
  const upn = window.localStorage.getItem("upn")
    ? JSON.parse(window.localStorage.getItem("upn"))
    : {};
  const userData = (Object.keys(authData).length && Object.keys(upn)) ? await axios
    .get(baseUrl + upn, {
      headers: { Authorization: `Bearer ${authData.accessToken}` },
    })
    .then((res) => {
      return { userData: res.data, isAuthenticate: true };
    })
    .catch((err) => {
      console.log("getUserError => ", err);
      return { userData: {}, isAuthenticate: false };
    }) : {userData: {}, isAuthenticate: false};
  return userData;
});

export const handleSignUp = createAsyncThunk(
  "authentication/handleSignUp",
  async (data) => {
    const signUp = await axios
      .post(baseUrl + "users/register", {
        upn: data.upn,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: data.username,
        email: data.email,
        gender: 0,
      })
      .then((response) => {
        console.log("SignUp ===> ", response);
        return response.data;
      })
      .catch((err) => {
        console.log("signUpError => ", err);
        return err.response.data;
      });
    return signUp;
  }
);

export const handleSignIn = createAsyncThunk(
  "authentication/handleSignIn",
  async (data, { dispatch }) => {
    const login = await axios
      .post(baseUrl + "authentication/token", {
        upn: data.username,
        password: data.password,
      })
      .then((response) => {
        console.log("loginResponse ===> ", response.data);
        if (response.data.accessToken && response.data?.status === "Success") {
          localStorage.setItem("userData", JSON.stringify(response.data));
          localStorage.setItem("upn", JSON.stringify(data.username));
        }
        return response.data;
      })
      .catch((err) => {
        console.log("loginError => ", err.response.data);
        return {};
      });
    dispatch(getUser());
    return login;
  }
);

export const handleSignOut = createAsyncThunk(
  "authentication/handleSignOut",
  async (data, { dispatch }) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("upn");
    dispatch(getUser());
  }
);

export const deleteAccount = createAsyncThunk(
  "authentication/deleteAccount",
  async (data, { dispatch }) => {
    await axios
      .delete(baseUrl + "users", { headers: authHeader() })
      .then((res) => {
        localStorage.removeItem("userData");
        localStorage.removeItem("upn");
      })
      .catch((err) => {
        console.log("errorDelete => ", err);
      });
    dispatch(getUser());
  }
);

export const requestResetPassword = createAsyncThunk("authentication/requestResetPassword", async(email) => {
  await axios
    .post(baseUrl + "users/request-reset-password", {email: email, prefixUri: "http://localhost:3000/reset-password"})
    .then((response) => {
      console.log("response => ", response);
    })
    .catch((err) => {
      console.log("err => ", err);
    })
})


export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: {},
    response: {},
    isAuthenticate: false,
    isLoading: true,
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSignUp.fulfilled, (state, action) => {
        // state.response = action.payload;
      })
      .addCase(handleSignIn.fulfilled, (state, action) => {
        // state.response = action.payload;
      })
      .addCase(handleSignOut.fulfilled, (state, action) => {
        // state.response = initialUser();
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.isAuthenticate = action.payload.isAuthenticate;
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default authSlice.reducer;
