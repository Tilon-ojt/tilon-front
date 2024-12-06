import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../reducer/authSlice';
import api from '../../../api/axios';
import "./Loginpage.css";
import store from '../../../store';

function Loginpage() {
  const [empName, setEmpName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch

  const handleLogin = async () => {
    try {
      const response = await api.post('user/login', {
        empName,
        password,
      });
      console.log('로그인 성공:', response.data);

      // JWT 저장
      const { token } = response.data;
      dispatch(setToken(token)); // Redux 상태에 저장
      // localStorage.setItem('jwt', token); // 로컬 스토리지에도 저장
      console.log('Redux 상태 확인:', store.getState().auth.token); // 상태 확인

      navigate('/admin');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='login-background'>
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
        <button
          className="login-btn"
          onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Loginpage;