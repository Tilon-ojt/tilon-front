import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import './AdminHome.css';

import NewsList from '../news/NewsList.jsx';
import EditNews from '../news/EditNews.jsx';
import EditProfile from '../MyInfo/EditProfile.jsx';
import CreateNews from '../news/CreateNews.jsx';
import Insight from '../Insight/Insight.jsx';


function AdminHome() {

    // useEffect(() => {
    //     // 로컬 스토리지에서 JWT 가져오기
    //     const jwt = localStorage.getItem("jwt");
    
    //     if (!jwt) {
    //       console.error("JWT가 존재하지 않습니다. 다시 로그인해주세요.");
    //       return;
    //     }
    
    //     // // JWT를 사용해 서버에서 사용자 데이터 가져오기
    //     // const fetchUserData = async () => {
    //     //   try {
    //     //     const response = await api.get("/user/data", {
    //     //       headers: {
    //     //         Authorization: `Bearer ${jwt}`, // Authorization 헤더에 JWT 추가
    //     //       },
    //     //     });
    //     //     setUserData(response.data); // 사용자 데이터 상태에 저장
    //     //   } catch (error) {
    //     //     console.error("사용자 데이터를 가져오는데 실패했습니다:", error);
    //     //   }
    //     // };
    
    //     // fetchUserData();
    //   }, []);

    const [adminComp, setAdminComp] = useState('Profile');

    const renderComponent = () => {
        switch (adminComp) {
            case 'News':
                return <NewsList onNavigate={(c) => setAdminComp(c)} />;
            case 'EditNews':
                return <EditNews />
            case 'CreateNews':
                return <CreateNews />
            case 'My':
                return <EditProfile />
            case 'INSIGHT':
                return <Insight />
            default:
                return <div>반갑습니다!</div>;
        }
    };

    return (
        <div className='admin-home'>
            <nav>
                <img
                    alt='logo'
                    src='https://www.tilon.com/dist/pc_logo.png?a30e64d3cafa9a2c5cbf7b217ccc9aba'
                />
                <div>
                    <span>~님 안녕하세요!</span>
                    <LogOut size={40} className='logout-icon' />
                </div>
            </nav>

            <div className='admin-home-space'>
                <side>
                    <ul>
                        <li onClick={() => setAdminComp('My')}>내 정보 수정</li>
                        <hr />
                        <li onClick={() => setAdminComp('News')}>News</li>
                        <hr />
                        <li>PR</li>
                        <hr />
                        <li onClick={() => setAdminComp('INSIGHT')}>INSIGHT</li>
                        <hr />
                    </ul>
                </side>

                <div className='admin-component'>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
