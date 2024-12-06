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
import TheTable2 from '../../../components/element/TheTable2';

function UserListPage() {

    const thead = ['사용자','id', '비고'];

    const decodedToken = useAuth(); // 디코드된 JWT 데이터를 받음
    const [adminInfo, setAdminInfo] = useState([]);
    
    console.log(`디코드된 jwt: ${JSON.stringify(decodedToken, null, 2)}`);

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
            <TheTable2 thead={thead}>
                
                        {
                            adminInfo?.map((item, idx) => 
                                <tr key={idx}>
                                    <td>{item?.empName}</td>
                                    <td>{item?.empName}</td>
                                    <td>{item?.empName}</td>

                                </tr>
                            )
                        }
                </TheTable2>
            <UserList adminInfo={adminInfo} getUserList={getUserList}/>
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
