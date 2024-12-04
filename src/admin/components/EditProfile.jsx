import React, { useState, useEffect } from 'react';
import '../components/EditProfile.css';

function EditProfile() {
    const [email, setEmail] = useState("");  // 이메일 상태 관리
    const [password, setPassword] = useState("");  // 변경 비밀번호 상태 관리
    const [confirmPassword, setConfirmPassword] = useState("");  // 변경 비밀번호 확인 상태 관리
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
        setEmail(fetchedUserInfo.email || "");  // 이메일이 있을 경우 설정
    }, []);

    // 이메일 입력 변경 핸들러
    const emailHandler = (e) => {
        setEmail(e.target.value);  // 입력 값으로 이메일 상태 업데이트
    };

    // 비밀번호 입력 변경 핸들러
    const passwordHandler = (e) => {
        setPassword(e.target.value);  // 입력 값으로 비밀번호 상태 업데이트
    };

    // 비밀번호 확인 입력 변경 핸들러
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);  // 입력 값으로 비밀번호 확인 상태 업데이트
    };

    const handleSubmit = () => {
        // 비밀번호가 일치하는지 확인
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        // 이메일 형식 검증 (정규식 사용)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }
    
        // 이메일과 비밀번호 업데이트 로직 (예: API 호출 등)
        alert(`이메일이 수정되었습니다: ${email}`);
        // 실제로는 서버에 이메일과 비밀번호를 전송하는 로직 추가
    };
    

    return (
        <div className='edit-prof'>
            <h2>내 정보 수정</h2>
            <hr style={{ width: '100%' }} />
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
                <div className='info-item'>
                    <label>이메일 </label>
                    <label className='tally' />
                    <input
                        type="email"
                        value={email}
                        onChange={emailHandler}
                        placeholder="이메일을 추가해주세요"
                    />
                </div>
                <div className='info-item'>
                    <label>현재 비밀번호 </label>
                    <label className='tally' />
                    <span>{userInfo.currentPassword}</span>
                </div>
                <div className='info-item'>
                    <label>변경 비밀번호 </label>
                    <label className='tally' />
                    <input
                        type="password"
                        value={password}
                        onChange={passwordHandler}
                        placeholder="변경할 비밀번호"
                    />
                </div>
                <div className='info-item'>
                    <label>변경 비밀번호 확인 </label>
                    <label className='tally' />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={confirmPasswordHandler}
                        placeholder="비밀번호 확인"
                    />
                </div>
            </div>
            <button className='submit-btn' onClick={handleSubmit}>수정</button>
        </div>
    );
}

export default EditProfile;
