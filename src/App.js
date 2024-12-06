import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import PostEditor from './pages/Admin/PostEdit/PostEditor'; // 중복된 임포트 제거
import TilonHomepage from './pages/Home/TilonHomepage';
import Loginpage from './pages/Admin/Login/Loginpage';
import AdminMain from './pages/Admin/AdminMain/AdminMain';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* 메인 홈 경로 */}
          <Route path="/" element={<TilonHomepage />} />

          {/* 관리자 로그인 */}
          <Route path="/admin/login" element={<Loginpage />} />

          {/* 관리자 페이지 - Sidebar를 특정 경로에만 렌더링 */}
          <Route path="/admin/edit" element={<PostEditor />} />
          <Route
            path="/admin/*"
            element={
              <Routes>
                <Route path="" element={<AdminMain />} />
                {/* 추가적인 하위 경로 */}
              </Routes>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
