import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import AdminInfoBox from '../components/AdminInfoBox';
import "./Adminpage.css";

function Adminpage() {
    // 더미 데이터 설정 (나중에 Axios로 대체 예정)
    const [adminInfo, setAdminInfo] = useState([
        { id: 1, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        { id: 2, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        { id: 3, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        { id: 4, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        { id: 5, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        { id: 6, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        { id: 7, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        { id: 8, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        { id: 9, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        { id: 10, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        { id: 11, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        { id: 12, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        { id: 13, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        { id: 14, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        { id: 15, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
        { id: 16, name: "홍길동", employeeId: "12345", email: "hong@tilon.com", department: "개발팀", position: "팀장" },
        { id: 17, name: "김철수", employeeId: "67890", email: "kim@tilon.com", department: "디자인팀", position: "디자이너" },
        { id: 18, name: "이영희", employeeId: "11223", email: "lee@tilon.com", department: "기획팀", position: "기획자" },
    ]);

    // 실제 API 요청을 보내는 useEffect (나중에 구현)
    // useEffect(() => {
    //     axios.get('/api/admins')
    //         .then(response => {
    //             setAdminInfo(response.data); // 서버에서 받은 데이터를 상태로 설정
    //         })
    //         .catch(error => {
    //             console.error("There was an error fetching the data!", error);
    //         });
    // }, []);

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
                <AdminInfoBox adminInfo={adminInfo} />
            </div>
        </div>
    );
}

export default Adminpage;
