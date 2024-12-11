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

import Loginpage from "./pages/Admin/Login/Loginpage";
import EditProfile from "./pages/Admin/MyInfo/EditProfile";

import AdminNews from "./pages/Admin/NewsPage/AdminNews";
import NewsDetail from './pages/Admin/NewsPage/NewsDetail';
import NewsCreate from "./pages/Admin/NewsPage/NewsCreate";
import NewsEdit from "./pages/Admin/NewsPage/NewsEdit";

import AdminPr from "./pages/Admin/Pr/AdminPr";
import AdminInsight from "./pages/Admin/Insight/AdminInsight";
import PrivateRoute from "./components/PrivateRoute";
import UserListPage2 from "./pages/Admin/UserListPage/UserListPage2";
import PostEdit from "./pages/Admin/Pr/EditPr";
import EditPr from "./pages/Admin/Pr/EditPr";
import EditDetail from './pages/Admin/Pr/EditDetail';
import PostWrite from "./pages/Admin/PostEdit/PostWrite";

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
                    path="/news/:postId"
                    element={<PrivateRoute element={<NewsDetail />} />}
                  />

                  <Route
                    path="news/create"
                    element={<PrivateRoute element={<NewsCreate />} />}
                  />


                  <Route
                    path="/news/edit/:postId"
                    element={<PrivateRoute element={<NewsEdit />} />}
                  />
                  
                  <Route
                    path="/pr"
                    element={<PrivateRoute element={<AdminPr />} />}
                  />
                  
                  <Route
                    path="/pr/:postId"
                    element={<PrivateRoute element={<EditDetail />} />}
                  />

                  <Route
                    path="/pr/write"
                    element={<PrivateRoute element={<PostWrite />} />}
                  />
                  
                  <Route
                    path="/insight"
                    element={<PrivateRoute element={<AdminInsight />} />}
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
