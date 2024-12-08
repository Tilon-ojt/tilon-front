import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../../components/common/Sidebar";
import Navbar from "../../../components/common/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import store from "../../../store";
import useAuth from "../../../hooks/useAuth";

function AdminMain() {
  // const decodedToken = useAuth(); // 디코드된 JWT 데이터를 받음
  // console.log(`디코드된 jwt: ${JSON.stringify(decodedToken, null, 2)}`);

  return (
    <Container>
      <Title>
        {/* {decodedToken ? `${decodedToken.empName}님 반갑습니다.` : "로딩 중..."} */}
      </Title>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left: 300px;
  margin-top: 62px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0; /* 기본 margin을 없애기 위한 설정 */
`;
export default AdminMain;
