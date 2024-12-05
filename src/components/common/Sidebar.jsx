import React, { useState } from 'react';
import styled from 'styled-components';

// Sidebar 컴포넌트
function Sidebar() {
  // "내용 수정" 클릭 시 하위 메뉴 토글 상태
  const [isContentOpen, setIsContentOpen] = useState(false);

  // "내용 수정" 클릭 시 하위 메뉴 열기/닫기 토글
  const toggleContentMenu = () => {
    setIsContentOpen(!isContentOpen);
  };

  // 로그아웃 기능 구현 (예시로 콘솔 로그 출력)
  const handleLogout = () => {
    // 실제 로그아웃 기능을 여기에 구현 (예: 인증 상태 초기화)
    console.log('로그아웃되었습니다.');
    // alert('로그아웃!')
  };

  return (
    <SidebarContainer>
      <Logo> 
        <img alt='logo'src='https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba'/>
      </Logo>              
      <hr />
      <ul>
      <li><a href="/admin">메인 페이지</a></li>
        <li><a href="/admin">내 정보 수정</a></li>
        <li><a href="/admin/settings">유저관리</a></li>

        {/* 내용 수정 클릭 시 하위 메뉴 토글 */}
        <li>
          <a onClick={toggleContentMenu} style={{ cursor: 'pointer' }}>
            내용 수정
          </a>
          {isContentOpen && (
            <SubMenu>
              <li><a href="/admin/news">뉴스</a></li>
              <li><a href="/admin/pr">PR</a></li>
              <li><a href="/admin/insight">Insight</a></li>
            </SubMenu>
          )}
        </li>
      </ul>

      {/* 로그아웃 이미지 아이콘 */}
      <LogoutIcon onClick={handleLogout}>
        <img src="path_to_your_logout_icon.png" alt="Logout" />
      </LogoutIcon>
    </SidebarContainer>
  );
}

// styled-components로 스타일 정의
const SidebarContainer = styled.div`
  position: fixed; /* 왼쪽에 고정 */
  top: 0;
  left: 0;
  width: 20%;  /* 사이드바 너비 */
  height: 100vh; /* 전체 화면 높이 */
  background: #171036 ;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */

  color: white;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;

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

export default Sidebar;
