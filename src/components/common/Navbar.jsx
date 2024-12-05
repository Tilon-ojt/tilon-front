import React, { useState } from 'react';
import styled from 'styled-components';

function Navbar() {

  // 로그아웃 기능 구현 (예시로 콘솔 로그 출력)
  const handleLogout = () => {
    // 실제 로그아웃 기능을 여기에 구현 (예: 인증 상태 초기화)
    console.log('로그아웃되었습니다.');
    // alert('로그아웃!')
  };

  return (
    <Navbarontainer>
        
      {/* 로그아웃 이미지 아이콘 */}
      <LogoutIcon onClick={handleLogout}>
        <img src="path_to_your_logout_icon.png" alt="Logout" />
      </LogoutIcon>
    </Navbarontainer>
  );
}


export default Navbar;

// styled-components로 스타일 정의
const Navbarontainer = styled.div`

  border-bottom: 2px solid gray;
  position: fixed; /* 위쪽에 고정 */
  top: 0;
  left: 0;
  width: 100%;  /* 사이드바 너비 */
  height: 62px; /* 전체 화면 높이 */
  background: white ;
  margin-left:20%;
  color: white;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    }

  a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
    color:white;
    &:hover {
      color: #007bff;
    }
  }
`;

// 로고 이미지
const Logo = styled.image`
  img{
    height: 30px;
    width: auto;
    margin-left: 20px;
  }
`

// 하위 메뉴 스타일
const SubMenu = styled.ul`
  list-style-type: none;
  padding-left: 20px;  /* 하위 메뉴를 들여쓰기 */
  margin-top: 10px;
  background-color: #e9ecef;  /* 하위 메뉴 배경 색 */
  
  li {
    margin-bottom: 10px;

  }

  a {
    color: #333;
    font-size: 14px;
    &:hover {
      color: #007bff;
    }
  }
`;

// 로그아웃 아이콘 스타일
const LogoutIcon = styled.div`
  position: absolute;
  bottom: 40px;  /* 화면 아래쪽 40px 위치 */
  left: 50%;
  transform: translateX(50%);  /* 가운데 정렬 */
  cursor: pointer;

  img {
    width: 30px;  /* 아이콘 크기 */
    height: 30px;  /* 아이콘 크기 */
  }

  &:hover img {
    opacity: 0.7;  /* 호버 시 아이콘 불투명도 감소 */
  }
`;

