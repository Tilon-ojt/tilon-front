import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import "./Loginpage.css";

function Loginpage() {


    const [empName , setEmpName ] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //로그인 버튼 눌렀을 때
    const handleLogin = async () => {

        console.log(`empName: ${empName }, password: ${password}`);


        try {
            const response = await api.post("user/login", {
                empName ,
                password,
            });
            console.log("로그인 성공:", response.data);

            // JWT 저장
            const { token } = response.data;
            localStorage.setItem("jwt", token);
            console.log("저장된 JWT:", localStorage.getItem("jwt"));

            navigate("/admin/home");

        } catch (error) {
            console.error("로그인 실패:", error);

        }
    };

    return (
        <div className='login-background'>
            <div className="login-container">
                <img
                    src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba"
                    alt="Tilon Logo"
                    className="login-tilon-logo"
                />
                <h1>로그인</h1>
                <input
                    type="text"
                    placeholder="아이디"
                    onChange={(e) => setEmpName(e.target.value)} />
                <input
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value)} />
                <button
                    className="login-btn"
                    onClick={handleLogin}>
                    로그인
                </button>
            </div>
        </div>
    );
}

export default Loginpage;
