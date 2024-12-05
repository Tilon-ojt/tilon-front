import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import UserList from './UserList';
import api from '../../../api/axios';
import styled from 'styled-components';

import "./UserListPage.css";
import store from '../../../store';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';

function UserListPage() {

    useAuth();  // 로그인 검증
    const [adminInfo, setAdminInfo] = useState([]);

    // const navigate = useNavigate();
    // const token = useSelector((state) => {
    //   console.log('Redux 상태 확인:', store.getState().auth.token); // 상태 확인
    //   return store.getState().auth.token;
    // });
  
    // useEffect(() => {
    //   if (!token) {
    //     alert('로그인이 필요합니다.');
    //     navigate('/admin/login');
    //     return;
    //   }
    
    //   // JWT 디코딩 및 만료 시간 확인
    //   const decodedToken = jwtDecode(token);
    //   const now = Date.now() / 1000;
    
    //   if (decodedToken.exp < now) {
    //     alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
    //     navigate('/admin/login');
    //   }
    
    //   console.log('디코딩된 JWT:', decodedToken);
    // }, [token, navigate]);

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {

        try {
            const jwt = localStorage.getItem("jwt"); // JWT 가져오기
            console.log(`jwt가져오기 : ${jwt}`);

            const response = await api.get("/admin/accounts", {
                headers: {
                    Authorization: `Bearer ${jwt}`, // JWT 포함
                },
            });

            console.log("유저목록:", response.data);
            setAdminInfo(response.data)

        } catch (error) {
            console.error("실패:", error);

        }
    };

    return (
        <Container>
            <UserList adminInfo={adminInfo} />
        </Container>
    );
}

export default UserListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  margin-left:300px;
  margin-top:62px;
`;
