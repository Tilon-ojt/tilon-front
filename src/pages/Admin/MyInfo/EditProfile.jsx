import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import TheButton from "../../../components/element/TheButton";
import { useNavigate } from "react-router-dom";

function EditProfile({ token }) {
  const navigate = useNavigate(); // useNavigate Hook
  const decodedToken = jwtDecode(token); // 디코드된 JWT 데이터를 받음
  console.log(`디코드된 jwt: ${JSON.stringify(decodedToken, null, 2)}`);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 비밀번호 일치 여부 상태 추가

  const validateNewPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // 영문 + 숫자 포함, 최소 6자
    if (!regex.test(password)) {
      return "비밀번호는 영문자와 숫자를 포함하여 6자리 이상이어야 합니다.";
    }
    return "";
  };

  useEffect(() => {
    // 새로운 비밀번호와 비밀번호 확인이 일치하면 버튼 활성화
    if (
      newPassword === confirmNewPassword &&
      newPassword &&
      confirmNewPassword
    ) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = async () => {
    console.log(`currentPassword: ${password}, newPassword: ${newPassword}`);
    try {
      const verifyResponse = await api.patch(
        "/admin/update",
        { currentPassword: password, newPassword: newPassword }, // 데이터 본문
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (verifyResponse.status === 200) {
        setPasswordError(""); // 초기화
        setNewPasswordError(""); // 초기화
        setConfirmPasswordError(""); // 초기화
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/admin/news");
      } else {
        setPasswordError("현재 비밀번호가 올바르지 않습니다.");
        return;
      }
    } catch (error) {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  // 회원탈퇴
  const userWithdrawalHandler = async (adminId) => {
    const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
    console.log(`탈퇴할 ID: ${adminId}입니다.`, typeof adminId);

    if (isConfirmed) {
      try {
        const response = await api.delete("", {
          data: { adminId },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("탈퇴 성공:", response.data);
        alert(`탈퇴되었습니다.`);
        navigate("/admin/login");
      } catch (error) {
        alert(`탈퇴 실패`);
        console.error("탈퇴 실패:", error);
      }
    } else {
      console.log("탈퇴가 취소되었습니다.");
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
                ? decodedToken.nickname
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
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!isPasswordMatch}
        >
          수정
        </button>
        <TheButton
          $dark
          width="100%"
          onClick={() => userWithdrawalHandler(decodedToken.adminId)}
        >
          회원탈퇴
        </TheButton>
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
  position: relative;

  h2 {
    margin-top: 0px;
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
    margin-bottom: 5px;
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

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const ErrorText = styled.span`
  color: red !important;
  font-size: 0.8rem;
  margin-top: 5px;
`;
