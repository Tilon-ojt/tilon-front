import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import styled from 'styled-components';
import './EditProfile.css';
import useAuth from '../../../hooks/useAuth';

function EditProfile() {

    useAuth();  // 로그인 검증

    const [password, setPassword] = useState(""); // 현재 비밀번호
    const [newPassword, setNewPassword] = useState(""); // 변경 비밀번호
    const [confirmNewPassword, setConfirmNewPassword] = useState(""); // 변경 비밀번호 확인

    const [userInfo, setUserInfo] = useState({
        name: "",   // 유저 이름
        employeeId: "",  // 사번
        currentPassword: "" // 현재 비밀번호
    });

    // 유저 정보를 받아오는 함수 (예시로 가정)
    useEffect(() => {
        // 실제 데이터는 API나 props로 받아오게 될 것
        const fetchedUserInfo = {
            name: "홍길동", // 예시 이름
            employeeId: "123456", // 예시 사번
            currentPassword: "9999", // 예시 현재 비밀번호
        };

        setUserInfo(fetchedUserInfo);

    }, []);

    const handleSubmit = async () => {
        // 새 비밀번호와 확인용 비밀번호가 일치하는지 확인
        if (newPassword !== confirmNewPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // 현재 비밀번호 확인 요청
            const verifyResponse = await api.post("/api/verify-password", {
                currentPassword: password,
            });

            if (verifyResponse.status === 200) {
                console.log("현재 비밀번호 인증 성공");
            } else {
                alert("현재 비밀번호가 올바르지 않습니다.");
                return;
            }

            // 새 비밀번호 변경 요청
            const updateResponse = await api.post("/api/change-password", {
                newPassword: newPassword,
            });

            if (updateResponse.status === 200) {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                setPassword(""); // 입력값 초기화
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
            <div className='edit-prof'>
                <h2>개인정보 수정</h2>
                <div className='user-info'>
                    <div className='info-item'>
                        <label>이름 </label>
                        <label className='tally' />
                        <span>{userInfo.name}</span>
                    </div>
                    <div className='info-item'>
                        <label>사번 </label>
                        <label className='tally' />
                        <span>{userInfo.employeeId}</span>
                    </div>
                    <div className="info-item">
                        <label>현재 비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="현재 비밀번호"
                        />
                    </div>
                    <div className="info-item">
                        <label>새 비밀번호</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="변경할 비밀번호"
                        />
                    </div>
                    <div className="info-item">
                        <label>새 비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="비밀번호 확인"
                        />
                    </div>
                </div>
                <button className='submit-btn' onClick={handleSubmit}>수정</button>
            </div>
        </Container>
    );
}

export default EditProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left:300px;
  margin-top:62px;
`;
