import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { useSelector } from 'react-redux';
// import { useState } from 'react';
import styled from 'styled-components';

function Navbar() {

  // 로그아웃 기능 구현 (예시로 콘솔 로그 출력)
  const handleLogout = () => {
    // 실제 로그아웃 기능을 여기에 구현 (예: 인증 상태 초기화)
    console.log('로그아웃되었습니다.');
    // alert('로그아웃!')
  };

  
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  console.log(`디코드된 jwt: ${JSON.stringify(decodedToken, null, 2)}`);

  return (
    <Container>
        <IdTxt>
            <span> {decodedToken.empName}님 안녕하세요</span>
            {/* <span> {Id}님 안녕하세요</span> */}
        </IdTxt>
        {/* 로그아웃 이미지 아이콘 */}
        <LogoutIcon onClick={handleLogout}>
            <img src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" alt="Logout" /> 
            {/* 아이콘 그냥 임의로 넣어 둠 다음에 수정 */}
        </LogoutIcon>
    </Container>
  );
}


export default Navbar;

// styled-components로 스타일 정의
const Container = styled.div`

  border-bottom: 2px solid #f5f5f5;
  position: fixed; /* 위쪽에 고정 */
  top: 0;
  left: 300px;
  width: 100%;  /* 사이드바 너비 */
  height: 62px; /* 전체 화면 높이 */
  background: white ;
  span{
    color: black;
  }
  }
`;


const IdTxt = styled.div`

 border: 1px solid red;

  position: fixed;
  left: 70%;
  cursor: pointer;

  span {
    color: blue;
  }

  &:hover img {
    opacity: 0.7;  /* 호버 시 아이콘 불투명도 감소 */
  }
`;
// 로그아웃 아이콘 스타일
const LogoutIcon = styled.div`

 border: 1px solid red;

  position: fixed;
  left: 50%;
  cursor: pointer;

  img {
    width: 30px;  /* 아이콘 크기 */
    height: 30px;  /* 아이콘 크기 */
  }

  &:hover img {
    opacity: 0.7;  /* 호버 시 아이콘 불투명도 감소 */
  }
`;
