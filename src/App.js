import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import store from './store';  // Make sure store is correctly imported

import TilonHomepage from './pages/Home/TilonHomepage';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';

import PostEditor from './pages/Admin/PostEdit/PostEditor';
import Loginpage from './pages/Admin/Login/Loginpage';  // Fix import name to match the component
import AdminMain from './pages/Admin/AdminMain/AdminMain';
import AdminNews from './pages/Admin/NewsPage/AdminNews';

function App() {
  return (
    <Provider store={store}>  {/* Redux Provider */}
      <Router>
        <Routes>  {/* Main Routes for App */}
          {/* 메인 홈 경로 */}
          <Route path="/" element={<TilonHomepage />} />

          {/* 관리자 로그인 */}
          <Route path="/admin/login" element={<Loginpage />} />

          

          {/* 관리자 페이지 - Sidebar를 특정 경로에만 렌더링 */}
          <Route
            path="/admin/*"
            element={
              <>
                <Sidebar />
                <Navbar />
                <Routes>  {/* Nested Routes inside /admin */}
                  <Route path="/" element={<AdminMain />} />
                  {/* 추가적인 하위 경로 */}
                  <Route path="/news" element={<AdminNews />} />
                  {/* <Route path="/edit" element={<PostEditor/>}/> */}
                </Routes>
              </>
            }
            
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
