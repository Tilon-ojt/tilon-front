import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/Home/TilonHomepage.jsx";
import Loginpage from "./pages/Admin/Login/Loginpage.jsx";

import PostEditor from "./pages/Admin/PostEdit/PostEditor.jsx";
import AdminHome from "./pages/Admin/AdminMain/AdminMain.jsx";
// import Adminpage from './pages/Admin/AdminList/Adminpage.jsx';
import { Provider } from 'react-redux';
import store from './store';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Home from './atilon/Home';
// import AdminHome from './atilon/AdminHome';
// import AdminLogin from './atilon/AdminLogin';
// import Sidebar from './atilon/Sidebar.jsx';''

import TilonHomePage from './pages/Home/TilonHomepage';

import AdminLogin from './pages/Admin/Login/Loginpage';
import AdminMain from './pages/Admin/AdminMain/AdminMain';

function App() {
  return (
    <Router>
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
                <Routes>
                  <Route path="" element={<AdminMain />} />
                  {/* 추가적인 하위 경로 */}
                </Routes>
              </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
