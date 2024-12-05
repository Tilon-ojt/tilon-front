import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import UserList from './UserList';
import api from '../../../api/axios';

import "./UserListPage.css";

function UserListPage() {
    // 더미 데이터 설정 (나중에 Axios로 대체 예정)
    const [adminInfo, setAdminInfo] = useState([
        // { id: 1, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        // { id: 2, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        // { id: 3, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        // { id: 4, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        // { id: 5, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        // { id: 6, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        // { id: 7, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        // { id: 8, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        // { id: 9, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        // { id: 10, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        // { id: 11, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        // { id: 12, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        // { id: 13, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        // { id: 14, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        // { id: 15, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        // { id: 16, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        // { id: 17, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        // { id: 18, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
    ]);

    // 실제 API 요청을 보내는 useEffect
    useEffect(() => {
        getUserList();
    }, []);

    //로그인 버튼 눌렀을 때
    const getUserList = async () => {

        try {
            const jwt = localStorage.getItem("jwt"); // JWT 가져오기
            console.log(`jwt가져오기 : ${jwt}`);
            
            const response = await api.get("/admin/list", {
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
        <div className='adminpage'>
            <header className="admin-header">
                <div className="logo-container">
                    <img src="https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba" alt="Tilon Logo" className="tilon-logo" />
                </div>
                <LogOut size={40} className='logout-icon' />
            </header>
            <div className='admin-info'>
                {/* AdminInfoBox에 adminInfo 배열 전달 */}
                <UserList adminInfo={adminInfo} />
            </div>
        </div>
    );
}

export default UserListPage;
