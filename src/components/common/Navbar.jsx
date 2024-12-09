import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const token = useSelector((state) => state.auth.token);
  // token이 유효한지 확인하고 jwtDecode 사용
  const [empName, setEmpName] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmpName(decodedToken?.empName || "사용자 정보 없음"); // empName이 없다면 기본 메시지 설정
        setLoading(false);
      } catch (error) {
        console.error("JWT 디코딩 오류:", error);
        setLoading(false);
      }
    } else {
      setLoading(false); // token이 없을 때도 로딩 완료 상태로 설정
    }
  }, [token]);

  const logoutHandler = async () => {
    const isConfirmed = window.confirm("로그아웃하시겠습니까?");
    if (isConfirmed) {
      try {
        const response = await api.post(`/admin/logout`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("로그아웃 성공:", response.data);
        alert("로그아웃 성공");
        sessionStorage.removeItem("jwt");
        navigate("/admin/login");
      } catch (error) {
        alert(`로그아웃 실패`);
        console.error("로그아웃 실패:", error);
      }
    } else {
      console.log("로그아웃 실패");
    }
  };

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
