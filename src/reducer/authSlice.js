import { createSlice } from "@reduxjs/toolkit";

// 기존
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("jwt") || null, // 세션 스토리지에서 토큰을 가져옴
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // redux 상태에 토큰 저장
      sessionStorage.setItem("jwt", action.payload); // 로컬 스토리지에 토큰 저장
    },
    clearToken: (state) => {
      state.token = null;
      sessionStorage.removeItem("jwt"); // 로컬 스토리지에서 토큰 제거
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;

// 쿠키 세션에 저장
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     accessToken: sessionStorage.getItem("accesToken") || null, // 세션 스토리지에서 토큰을 가져옴
//     refreshToken: sessionStorage.getItem("refreshToken") || null, // 세션 스토리지에서 �����을 가져��
//   },
//   reducers: {
//     setAccessToken: (state, action) => {
//       state.accessToken = action.payload; // redux 상태에 토큰 저장
//       sessionStorage.setItem("accessToken", action.payload); // 로컬 스토리지에 토큰 저장
//     },
//     clearAccessToken: (state) => {
//       state.accessToken = null;
//       sessionStorage.removeItem("accessToken"); // 로컬 스토리지에서 토큰 제거
//     },
//     setRefreshToken: (state, action) => {
//       state.refreshToken = action.payload;
//       sessionStorage.setItem("refreshToken", action.payload);
//     },
//     clearRefreshToken: (state) => {
//       state.refreshToken = null;
//       sessionStorage.removeItem("refreshToken"); // 로�� 스토리지에서 ����� 제거
//     },
//   },
// });

// export const {
//   setAccessToken,
//   clearAccessToken,
//   setRefreshToken,
//   clearRefreshToken,
// } = authSlice.actions;

// export default authSlice.reducer;
