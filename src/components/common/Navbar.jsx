import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Navbar() {
  const [empName, setEmpName] = useState(null);
  const [loading, setLoading] = useState(true);

  const logoutHandler = () => {
    // 로그아웃 처리 예제
    fetch("/logout", { method: "POST", credentials: "include" })
      .then((response) => {
        if (response.ok) {
          console.log("로그아웃되었습니다.");
          window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 리다이렉트
        } else {
          console.error("로그아웃에 실패했습니다.");
        }
      })
      .catch((error) => console.error("로그아웃 요청 오류:", error));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // 토큰 저장 위치 확인
        if (!token) throw new Error("토큰이 없습니다.");

        const response = await fetch("http://localhost:8000/admin/accounts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("사용자 정보를 가져오기 실패");

        const data = await response.json();
        // 원하는 사용자 정보 추출 (예: 첫 번째 관리자)
        const currentUser = data[0]; // 또는 특정 조건으로 필터링
        setEmpName(currentUser.adminName);
      } catch (error) {
        console.error("API 호출 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Container>
      <IdTxt>
        <span>
          {loading
            ? "로딩 중..."
            : empName
            ? `${empName}님 안녕하세요`
            : "사용자 정보를 불러올 수 없습니다."}
        </span>
      </IdTxt>
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
  width: calc(100% - 300px);
  height: 62px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;

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
    margin-right: 10px;
  }

  &:hover img {
    opacity: 0.7;
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
