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
