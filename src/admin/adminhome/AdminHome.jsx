import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import '../adminhome/AdminHome.css';

import NewsList from '../components/news/NewsList.jsx';
import EditNews from '../components/news/EditNews.jsx';
import EditProfile from '../components/EditProfile.jsx';
import CreateNews from '../components/news/CreateNews.jsx';


function AdminHome() {
    const [adminComp, setAdminComp] = useState('Profile');

    const renderComponent = () => {
        switch (adminComp) {
            case 'News':
                return <NewsList onNavigate={(c) => setAdminComp(c)} />;
            case 'EditNews':
                return <EditNews onNavigate={(c) => setAdminComp(c)}/>            
            case 'CreateNews':
                return <CreateNews onNavigate={(c) => setAdminComp(c)}/>
            case 'My':
                return <EditProfile />
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
                        <li>INSIGHT</li>
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
