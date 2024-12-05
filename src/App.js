import React from 'react';
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

function App() {

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

