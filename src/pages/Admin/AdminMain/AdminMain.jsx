import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../../../components/common/Sidebar';
import Navbar from '../../../components/common/Navbar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import store from '../../../store';
import useAuth from '../../../hooks/useAuth';

function AdminMain() {

  // useAuth();  // 로그인 검증

  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  console.log(`디코드된 jwt: ${JSON.stringify(decodedToken, null, 2)}`);
  
  return (
    <Container>
      <Title>AdminXXXX</Title>
    </Container>
  );
}


// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;  /* 화면을 꽉 채우도록 설정 */
  margin-left:300px;
  margin-left:300px;
  margin-top:62px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;  /* 기본 margin을 없애기 위한 설정 */
`;
export default AdminMain;
