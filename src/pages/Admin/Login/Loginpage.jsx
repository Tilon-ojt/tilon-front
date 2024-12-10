import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../../api/axios";
import "./Loginpage.css";
import store from "../../../store";
import { setToken } from "../../../reducer/authSlice";

function Loginpage() {
  const [empName, setEmpName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch

  const handleLogin = async () => {
    try {
      const response = await api.post("user/login", {
        empName,
        password,
      });
      console.log("로그인 성공:", response.data);

      // JWT 저장 (리프레쉬 토큰 없는 버전)
      // const { token } = response.data;
      // dispatch(setToken(token)); // Redux 상태에 저장
      // console.log("Redux 상태 확인:", store.getState().auth.token); // 상태 확인

      // JWT 저장 (리프레쉬 토큰 있는 버전)
      const { accessToken, refreshToken } = response.data;

      // 세션에 엑세스토큰 저장
      dispatch(setToken(accessToken)); // Redux 상태에 저장
      console.log("Redux 상태 확인:", store.getState().auth.token); // 상태 확인

      // 쿠키에 리프레쉬 토큰 저장
      document.cookie = `cookie=${refreshToken}; path=/;`;
      console.log("저장된 쿠키:", document.cookie);

      navigate("/admin/news");
    } catch (error) {
      alert("아이디 또는 비밀번호가 올바르지않습니다.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <img
          src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba"
          alt="Tilon Logo"
          className="login-tilon-logo"
        />
        <h1>로그인</h1>
        <input
          type="text"
          placeholder="아이디"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
          onKeyDown={handleKeyPress} // 엔터 키 입력 감지
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress} // 엔터 키 입력 감지
        />
        <button className="login-btn" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Loginpage;
