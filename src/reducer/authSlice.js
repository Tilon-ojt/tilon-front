import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('jwt') || null,  // 로컬 스토리지에서 토큰을 가져옴
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('jwt', action.payload);  // 로컬 스토리지에 토큰 저장
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('jwt');  // 로컬 스토리지에서 토큰 제거
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
