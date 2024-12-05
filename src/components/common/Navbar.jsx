import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Navbar() {
  // 상태 변수 추가: 로그인한 사용자 ID
  const [empName, setUserId] = useState(null);

  // 로그아웃 기능 구현
  const logoutHandler = () => {
    // 실제 로그아웃 기능을 여기에 구현 (예: 인증 상태 초기화)
    console.log('로그아웃되었습니다.');
    // alert('로그아웃!')
  };

  // 컴포넌트 마운트 시 사용자 ID 불러오기
  useEffect(() => {
    // 사용자 ID를 백엔드에서 가져오는 함수
    const fetchUserId = async () => {
      try {
        // API 호출
        const response = await fetch('/admin');
        const data = await response.json();

        if (response.ok) {
          setUserId(data.empName); 
        } else {
          console.error('사용자 정보를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <Container>
      <IdTxt>
        <span>{empName ? `${empName}님 안녕하세요` : '로딩 중...'}</span>
      </IdTxt>

      {/* 로그아웃 이미지 아이콘 */}
      <LogoutIcon onClick={logoutHandler}>
        <img
          src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png"
          alt="Logout"
        />
      </LogoutIcon>
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  border-bottom: 2px solid #f5f5f5;
  position: fixed;
  top: 0;
  left: 300px;
  width: calc(100% - 300px); /* 사이드바를 제외한 나머지 화면 너비 */
  height: 62px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 양쪽 끝에 배치 */
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;

  span {
    color: black;
  }
`;

const IdTxt = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    color: black;
    font-size: 20px;
    margin-right: 10px; /* 아이콘과 텍스트 간격 */
  }

  &:hover img {
    opacity: 0.7; /* 호버 시 아이콘 불투명도 감소 */
  }
`;

const LogoutIcon = styled.div`
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    opacity: 0.7;
    margin-top: 5px;
  }

  &:hover img {
    opacity: 1;
  }
`;
