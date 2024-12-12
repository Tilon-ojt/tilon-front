import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import TheButton2 from "../../../components/element/TheButton2";
import { useNavigate } from "react-router-dom";
import TheModal from "../../../components/element/TheModal";
import { CircleAlert } from "lucide-react";

function EditProfile({ token }) {
  const navigate = useNavigate(); // useNavigate Hook

  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded); // 상태 업데이트
        setMyAdminId(decoded.adminId || null); // adminId가 없는 경우 null로 설정
      } catch (err) {
        console.error("토큰 디코딩 중 오류 발생:", err);
      }
    } else {
      console.error("Token이 null이거나 undefined입니다.");
    }
  }, [token]);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [myAmdinId, setMyAdminId] = useState([]); // ID를 서버로 보낼때 배열로 보내야함

  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 비밀번호 일치 여부 상태 추가

  const [passwordCheckModalIsShow, setPasswordCheckModalIsShow] =
    useState(false); // 비밀번호 확인창

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

  // 비밀번호 변경
  const handleSubmit = async () => {
    console.log(`currentPassword: ${password}, newPassword: ${newPassword}`);
    if (password === newPassword) {
      alert("현재 비밀번호와 새 비밀번호가 동일합니다.");
      setNewPassword("");
      setConfirmNewPassword("");
      return;
    }
    try {
      const response = await api.patch(
        "/admin/update",
        { currentPassword: password, newPassword: newPassword }, // 데이터 본문
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPasswordError(""); // 초기화
      setNewPasswordError(""); // 초기화
      setConfirmPasswordError(""); // 초기화
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/admin/news");
    } catch (error) {
      //   if (error.response.status === 409) {
      //     alert("현재 비밀번호와 새 비밀번호가 동일합니다.");
      //     setNewPassword("");
      //     setConfirmNewPassword("");
      //   } else if (error.response.status === 401) {
      //     alert("현재 비밀번호가 올바르지 않습니다.");
      //     setPassword("");
      //   }

      alert("현재 비밀번호가 올바르지 않습니다.");
      setPassword("");
    }
  };

  // 회원탈퇴
  const userWithdrawalHandler = async (adminId) => {
    setPasswordCheckModalIsShow(true);
  };

  const ClosePasswordCheckModal = () => {
    setPasswordCheckModalIsShow(false); // 모달 닫기
  };

  const deleteUser = async () => {
    console.log(`삭제 또는 탈퇴할 사용자 ID: ${myAmdinId}`);
    try {
      const response = await api.delete("/admin/account", {
        data: { adminIds: myAmdinId, password: password },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("삭제, 탈퇴 성공:", response.data);
      alert("정상적으로 처리되었습니다.");
      setPassword("");
      ClosePasswordCheckModal();
      sessionStorage.removeItem("jwt");
      navigate("/");
    } catch (error) {
      alert(`비밀번호가 일치하지 않습니다.`);
      console.error("실패:", error);
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
        <TheButton2
          $dark
          width="100%"
          onClick={() => userWithdrawalHandler(decodedToken.adminId)}
        >
          회원탈퇴
        </TheButton2>
      </EditProfileCard>
      {passwordCheckModalIsShow && (
        <TheModal title={"정말 탈퇴하시겠어요?"}>
          <CircleAlert size={80} style={{ color: "red", width: "100%" }} />
          <P style={{ color: "red", width: "100%", marginBottom: "0" }}>
            탈퇴버튼 선택시, 계정은 삭제되며 복구되지 않습니다.
          </P>
          <P style={{ width: "100%", marginTop: "0" }}>
            탈퇴를 원하면 비밀번호 입력 후 탈퇴버튼을 눌러주세요.
          </P>
          <Label>
            <P>비밀번호 :</P>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
            />
          </Label>
          <ButtonContainer2>
            <TheButton2 $danger width="200px" onClick={deleteUser}>
              확인
            </TheButton2>
            <TheButton2 width="200px" onClick={ClosePasswordCheckModal}>
              취소
            </TheButton2>
          </ButtonContainer2>
        </TheModal>
      )}
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
      background-color: #8bbdff;
      cursor: not-allowed;
    }
  }
`;

const ErrorText = styled.span`
  color: red !important;
  font-size: 0.8rem;
  margin-top: 5px;
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

const ButtonContainer2 = styled.div`
  display: flex;
  gap: 5px;
`;
