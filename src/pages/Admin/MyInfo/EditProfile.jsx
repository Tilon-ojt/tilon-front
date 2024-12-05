import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import styled from 'styled-components';
import useAuth from '../../../hooks/useAuth';

function EditProfile() {

    //원래는 커스텀훅으로 로그인되어있는지 확인
    // 그리고나서 jwt디코드 하고 정보 뿌려주기

    const [password, setPassword] = useState(""); 
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [userInfo, setUserInfo] = useState({
        name: "",
        employeeId: "",
        currentPassword: ""
    });

    useEffect(() => {
        const fetchedUserInfo = {
            name: "홍길동",
            employeeId: "123456",
            currentPassword: "9999"
        };
        setUserInfo(fetchedUserInfo);
    }, []);

    const handleSubmit = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const verifyResponse = await api.post("/api/verify-password", {
                currentPassword: password,
            });

            if (verifyResponse.status === 200) {
                console.log("현재 비밀번호 인증 성공");
            } else {
                alert("현재 비밀번호가 올바르지 않습니다.");
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
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Container>
            <EditProfileCard>
                <h2>회원 정보 수정</h2>
                <div className="user-info">
                    <div className="info-item">
                        <label>이름</label>
                        <span>{userInfo.name}</span>
                    </div>
                    <div className="info-item">
                        <label>아이디</label>
                        <span>{userInfo.employeeId}</span>
                    </div>
                    <div className="info-item">
                        <label>현재 비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="현재 비밀번호를 입력하세요"
                        />
                    </div>
                    <div className="info-item">
                        <label>새 비밀번호</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="새 비밀번호를 입력하세요"
                        />
                    </div>
                    <div className="info-item">
                        <label>새 비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="새 비밀번호를 다시 입력하세요"
                        />
                    </div>
                </div>
                <button className="submit-btn" onClick={handleSubmit}>수정</button>
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
  margin-left:300px;
  margin-top:62px;
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
