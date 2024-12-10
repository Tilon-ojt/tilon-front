// @@@@@@@@@@@ 검증 없는 버전
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Provider } from "react-redux"; // Import Provider from react-redux
// import store from "./store"; // Make sure store is correctly imported

// import TilonHomepage from "./pages/Home/TilonHomepage";
// import Sidebar from "./components/common/Sidebar";
// import Navbar from "./components/common/Navbar";

// import PostEditor from "./pages/Admin/PostEdit/PostEditor";
// import Loginpage from "./pages/Admin/Login/Loginpage";
// import UserListPage from "./pages/Admin/UserListPage/UserListPage";
// import EditProfile from "./pages/Admin/MyInfo/EditProfile";

// import AdminNews from "./pages/Admin/NewsPage/AdminNews";
// import CreateNews from "./pages/Admin/NewsPage/CreateNews";
// import EditNews from "./pages/Admin/NewsPage/EditNews";

// function App() {
//   return (
//     <Router>
//       <Provider store={store}>
//         <Routes>
//           {/* 메인 홈 경로 */}
//           <Route path="/" element={<TilonHomepage />} />

//           {/* 관리자 로그인 */}
//           <Route path="/admin/login" element={<Loginpage />} />

//           {/* 관리자 페이지 - Sidebar를 특정 경로에만 렌더링 */}
//           <Route
//             path="/admin/*"
//             element={
//               <>
//                 <Sidebar />
//                 <Navbar />
//                 <Routes>
//                   <Route path="/user" element={<UserListPage />} />
//                   <Route path="/myInfo" element={<EditProfile />} />
//                   <Route path="/news" element={<AdminNews />} />
//                   <Route path="news/create" element={<CreateNews />} />
//                   <Route path="news/edit/:id" element={<EditNews />} />

//                   <Route path="/edit" element={<PostEditor />} />
//                   {/* 추가적인 하위 경로 */}
//                 </Routes>
//               </>
//             }
//           />
//         </Routes>
//       </Provider>
//     </Router>
//   );
// }

// export default App;

// @@@@@@@@@@ 로그인 검증있는 버전
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import TilonHomepage from "./pages/Home/TilonHomepage";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";

import PostEditor from "./pages/Admin/PostEdit/PostEditor";
import Loginpage from "./pages/Admin/Login/Loginpage";
import EditProfile from "./pages/Admin/MyInfo/EditProfile";

import AdminNews from "./pages/Admin/NewsPage/AdminNews";
import CreateNews from "./pages/Admin/NewsPage/CreateNews";
import EditNews from "./pages/Admin/NewsPage/EditNews";
import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute 임포트
import UserListPage2 from "./pages/Admin/UserListPage/UserListPage2";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          {/* 메인 홈 경로 */}
          <Route path="/" element={<TilonHomepage />} />

          {/* 관리자 로그인 */}
          <Route path="/admin/login" element={<Loginpage />} />

          {/* 관리자 페이지 - PrivateRoute를 사용하여 로그인 상태 체크 */}
          <Route
            path="/admin/*"
            element={
              <>
                <Sidebar />
                <Navbar />
                <Routes>
                  <Route
                    path="/user"
                    element={<PrivateRoute element={<UserListPage2 />} />}
                  />
                  <Route
                    path="/myInfo"
                    element={<PrivateRoute element={<EditProfile />} />}
                  />
                  <Route
                    path="/news"
                    element={<PrivateRoute element={<AdminNews />} />}
                  />
                  <Route
                    path="news/create"
                    element={<PrivateRoute element={<CreateNews />} />}
                  />
                  <Route
                    path="news/edit/:id"
                    element={<PrivateRoute element={<EditNews />} />}
                  />
                  <Route
                    path="/edit"
                    element={<PrivateRoute element={<PostEditor />} />}
                  />
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
