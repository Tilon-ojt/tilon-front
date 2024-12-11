import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getRefreshToken from "../../utils/getRefreshToken";
import TheButton2 from "../element/TheButton2";
import TheModal from "../element/TheModal";

function Navbar() {
  const token = useSelector((state) => state.auth.token);
  // token이 유효한지 확인하고 jwtDecode 사용
  const [empName, setEmpName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutModal, setLogoutModal] = useState(false);

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
    // console.log(`엑세스토큰확인: ${token} `);
    const refreshtoken = getRefreshToken();
    // console.log(`가지고있는 쿠키: ${refreshtoken}`);

    try {
      const response = await api.post(`/admin/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Refresh-Token": `${refreshtoken}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("로그아웃 성공:", response.data);
      sessionStorage.removeItem("jwt");
      document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin`;
      navigate("/admin/login");
    } catch (error) {
      alert(`로그아웃 실패`);
      console.error("로그아웃 실패:", error);
    }
  };

  const openLogoutModal = () => {
    setLogoutModal(true);
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
      <LogoutIcon onClick={openLogoutModal}>
        {/* <img
          src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png"
          alt="Logout"
        /> */}
        <p>로그아웃</p>
      </LogoutIcon>
      {logoutModal && (
        <TheModal title={"로그아웃 하시겠습니까?"}>
          <ButtonContainer2>
            <TheButton2 $dark width="200px" onClick={() => logoutHandler()}>
              로그아웃
            </TheButton2>
            <TheButton2 width="200px" onClick={() => setLogoutModal(false)}>
              취소
            </TheButton2>
          </ButtonContainer2>
        </TheModal>
      )}
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
  padding: 0 110px;
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

  &:hover p {
    border-bottom: 1px solid #000; /* 밑줄 두께와 색상 */
  }
`;

const ButtonContainer2 = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 10px;
`;
