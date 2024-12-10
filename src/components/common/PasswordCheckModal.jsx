import React, { useState } from "react";
import styled from "styled-components";
import TheButton2 from "../element/TheButton2";
import api from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PasswordCheckModal = ({
  selectedUserIds,
  ClosePasswordCheckModal,
  getUserList,
  massage,
}) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  console.log(`넘겨받은 id: ${selectedUserIds}`);
  const [password, setPassword] = useState("");

  const deleteUser = async () => {
    const isConfirmed = window.confirm(`${massage}`);
    if (isConfirmed) {
      console.log(`삭제 또는 탈퇴할 사용자 ID: ${selectedUserIds}`);
      try {
        const response = await api.delete("/admin/account", {
          data: { adminIds: selectedUserIds, password: password },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("삭제, 탈퇴 성공:", response.data);
        alert("정상적으로 처리되었습니다.");
        sessionStorage.removeItem("jwt");
        navigate("/");
      } catch (error) {
        alert(`실패`);
        console.error("실패:", error);
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>비밀번호 확인</ModalTitle>
        <Label>
          <P>비밀번호 :</P>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요"
          />
        </Label>
        <ButtonContainer>
          <TheButton2 $primary width="200px" onClick={deleteUser}>
            확인
          </TheButton2>
          <TheButton2
            $secondary
            width="200px"
            onClick={ClosePasswordCheckModal}
          >
            취소
          </TheButton2>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PasswordCheckModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 70%;
  height: 34px;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const P = styled.p`
  padding-left: 10px;
  width: 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;
