import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import styled from "styled-components";
import useAuth from "../../../hooks/useAuth";

function EditProfile() {
  const decodedToken = useAuth(); // 디코드된 JWT 데이터를 받음
  console.log(`디코드된 jwt: ${JSON.stringify(decodedToken, null, 2)}`);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateNewPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // 영문 + 숫자 포함, 최소 6자
    if (!regex.test(password)) {
      return "비밀번호는 영문자와 숫자를 포함하여 6자리 이상이어야 합니다.";
    }
    return "";
  };

  const handleSubmit = async () => {
    setPasswordError(""); // 초기화
    setNewPasswordError(""); // 초기화
    setConfirmPasswordError(""); // 초기화

    const newPasswordValidationError = validateNewPassword(newPassword);
    if (newPasswordValidationError) {
      setNewPasswordError(newPasswordValidationError);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const verifyResponse = await api.post("/api/verify-password", {
        currentPassword: password,
      });

      if (verifyResponse.status === 200) {
        console.log("현재 비밀번호 인증 성공");
      } else {
        setPasswordError("현재 비밀번호가 올바르지 않습니다.");
        return;
      }

      const updateResponse = await api.post("/api/change-password", {
        newPassword: newPassword,
      });

      if (updateResponse.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
    }
  };

  return (
    <Container>
      <EditProfileCard>
        <h2>회원 정보 수정</h2>
        <div className="user-info">
          <div className="info-item">
            <label>이름</label>
            <span>{`${
              decodedToken
                ? decodedToken.nickName
                : "이름을 불러 올 수 없습니다."
            }`}</span>
          </div>
          <div className="info-item">
            <label>아이디</label>
            <span>{`${
              decodedToken
                ? decodedToken.empName
                : "아이디를 불러 올 수 없습니다."
            }`}</span>
          </div>
          <div className="info-item">
            <label>현재 비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
            />
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </div>
          <div className="info-item">
            <label>새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);

                // 새로운 비밀번호 유효성 검사
                const validationError = validateNewPassword(e.target.value);
                setNewPasswordError(validationError);

                // 새로운 비밀번호 확인과 일치 여부 확인
                if (
                  confirmNewPassword &&
                  e.target.value !== confirmNewPassword
                ) {
                  setConfirmPasswordError("새 비밀번호가 일치하지 않습니다.");
                } else {
                  setConfirmPasswordError("");
                }
              }}
              placeholder="새 비밀번호를 입력하세요"
            />
            {newPasswordError && <ErrorText>{newPasswordError}</ErrorText>}
          </div>

          <div className="info-item">
            <label>새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);

                // 새로운 비밀번호와 확인 비밀번호 일치 여부 확인
                if (e.target.value !== newPassword) {
                  setConfirmPasswordError("새 비밀번호가 일치하지 않습니다.");
                } else {
                  setConfirmPasswordError("");
                }
              }}
              placeholder="새 비밀번호를 다시 입력하세요"
            />
            {confirmPasswordError && (
              <ErrorText>{confirmPasswordError}</ErrorText>
            )}
          </div>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          수정
        </button>
      </EditProfileCard>
    </Container>
  );
}

export default EditProfile;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 62px);
  margin-left: 300px;
  margin-top: 62px;
`;

const EditProfileCard = styled.div`
  background-color: #fff;
  width: 450px;
  border-radius: 12px;
  border: 1px solid #cccccccc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
  text-align: center;

  h2 {
    margin-bottom: 30px;
    font-size: 1.8rem;
    color: #333;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      label {
        font-size: 0.9rem;
        font-weight: bold;
        margin-bottom: 5px;
        color: #555;
      }

      span {
        font-size: 0.9rem;
        color: #777;
      }

      input {
        width: 95%;
        padding: 10px;
        font-size: 0.9rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        transition: all 0.3s;

        &:focus {
          border-color: #5a9cfb;
          outline: none;
          box-shadow: 0 0 4px rgba(90, 156, 251, 0.5);
        }
      }
    }
  }

  .submit-btn {
    margin-top: 20px;
    padding: 12px 20px;
    width: 100%;
    font-size: 1rem;
    color: #fff;
    background-color: #5a9cfb;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #478eea;
    }
  }
`;

const ErrorText = styled.span`
  color: red !important;
  font-size: 0.8rem;
  margin-top: 5px;
`;
