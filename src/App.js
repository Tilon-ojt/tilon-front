import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TilonHomePage from './pages/Home/TilonHomepage';

import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';

import AdminLogin from './pages/Admin/Login/Loginpage';
import AdminMain from './pages/Admin/AdminMain/AdminMain';
import { Provider } from 'react-redux';
import UserListPage from './pages/Admin/UserListPage/UserListPage';
import EditProfile from './pages/Admin/MyInfo/EditProfile';
import store from './store';
import AdminNews from './pages/Admin/NewsPage/AdminNews';

export const setupAuthManager = () => {
  window.addEventListener('beforeunload', (event) => {
    // 브라우저가 실제로 닫히는 경우에만 토큰 삭제
    let closingTime = new Date().getTime();
    localStorage.setItem('lastActivity', closingTime.toString());
    
    setTimeout(() => {
      let currentTime = new Date().getTime();
      let lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
      
      // 마지막 활동 시간과 현재 시간의 차이가 100ms 이상이면 토큰 삭제
      // 새로고침이나 페이지 이동의 경우 100ms 이내에 새로운 페이지가 로드되므로 토큰유지
      if (currentTime - lastActivity >= 100) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('lastActivity');
      }
    }, 100);
  });
};

function App() {

  useEffect(() => {
    setupAuthManager();
  }, []);

  return (
    <Router>
      <Provider store={store}>
        <Routes>
          {/* 메인 홈 경로 */}
          <Route path="/" element={<TilonHomePage />} />

          {/* 관리자 로그인 */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 관리자 페이지 - Sidebar를 특정 경로에만 렌더링 */}
          <Route
            path="/admin/*"
            element={
              <>
                <Sidebar />
                <Navbar />
                <Routes>
                  <Route path="" element={<AdminMain />} />
                  <Route path="/user" element={<UserListPage />} />
                  <Route path="/myInfo" element={<EditProfile />} />
                  <Route path="/news" element={<AdminNews />} />
                  {/* 추가적인 하위 경로 */}
                </Routes>
              </>
            }
          />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;

