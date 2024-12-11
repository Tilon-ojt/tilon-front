import { createSlice } from "@reduxjs/toolkit";

/**
/**
 * 인증 상태 관리를 위한 Redux 슬라이스
 * JWT 토큰을 상태로 관리하며, sessionStorage와 동기화
 *
 * @module authSlice
 */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    /**
     * 슬라이스의 초기 상태입니다.
     * @property {string|null} token - sessionStorage에서 가져온 JWT 토큰 또는 값이 없을 경우 null.
     */
    token: sessionStorage.getItem("jwt") || null,
  },
  reducers: {
    /**
     * JWT 토큰을 Redux 상태와 sessionStorage에 저장
     *
     * @function setToken
     * @param {Object} state - 현재 auth 슬라이스의 상태.
     * @param {Object} action - Redux 액션 객체.
     * @param {string} action.payload - 저장할 JWT 토큰.
     */
    setToken: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem("jwt", action.payload);
    },

    /**
     * JWT 토큰을 Redux 상태와 sessionStorage에서 제거
     *
     * @function clearToken
     * @param {Object} state - 현재 auth 슬라이스의 상태.
     */
    clearToken: (state) => {
      state.token = null;
      sessionStorage.removeItem("jwt");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
