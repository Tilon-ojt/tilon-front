// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import TilonHomePage from './pages/Home/TilonHomepage';

// import Sidebar from './components/common/Sidebar';
// import Navbar from './components/common/Navbar';

// import AdminLogin from './pages/Admin/Login/Loginpage';
// import AdminMain from './pages/Admin/AdminMain/AdminMain';

// import AdminNews from './pages/Admin/NewsPage/AdminNews';
// import CreateNews from './pages/Admin/NewsPage/CreateNews';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 메인 홈 경로 */}
//         <Route path="/" element={<TilonHomePage />} />

//         {/* 관리자 로그인 */}
//         <Route path="/admin/login" element={<AdminLogin />} />

//         {/* 관리자 페이지 - Sidebar를 특정 경로에만 렌더링 */}
//         <Route
//           path="/admin/*"
//           element={
//               <>
//                 <Sidebar/>
//                 <Navbar/>
//                 <Routes>
//                     <Route path="" element={<AdminMain />} />
//                     {/* 추가적인 하위 경로 */}
//                     <Route path="/news" element={<AdminNews />} />
//                     <Route path="/news/create" element={<CreateNews />} />
//                 </Routes>
//               </>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

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
import CreateNews from './pages/Admin/NewsPage/CreateNews';
import EditNews from './pages/Admin/NewsPage/EditNews';

function App() {
  return (
    <Provider store={store}>  {/* Redux Provider */}
      <Router>
        <Routes>  {/* Main Routes for App */}
          {/* 메인 홈 경로 */}
          <Route path="/" element={<TilonHomepage />} />

          {/* 관리자 로그인 */}
          <Route path="/admin/login" element={<Loginpage />} />

          

          {/* 관리자 페이지 - Sidebar와 Navbar가 필요한 경로 */}
          <Route
            path="/admin/*"
            element={
              <>
                <Sidebar />
                <Navbar />
                <Routes>
                  {/* 관리자 메인 */}
                  <Route path="" element={<AdminMain />} />
                  

                  {/* 관리자 뉴스 관리 */}
                  <Route path="news" element={<AdminNews />} />
                  <Route path="news/create" element={<CreateNews />} />
                  <Route path="news/edit/:id" element={<EditNews />} />

                  <Route path="/edit" element={<PostEditor/>}/>
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
