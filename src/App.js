import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserListPage2 from "./pages/Admin/UserListPage/UserListPage2";
import EditProfile from "./pages/Admin/EditProfile/EditProfile";
import AdminInsight from "./pages/Admin/Insight/AdminInsight";
import NewsDetail from "./pages/Admin/NewsPage/NewsDetail";
import NewsCreate from "./pages/Admin/NewsPage/NewsCreate";
import PostWrite from "./pages/Admin/PostEdit/PostWrite";
import AdminNews from "./pages/Admin/NewsPage/AdminNews";
import NewsEdit from "./pages/Admin/NewsPage/NewsEdit";
import TilonHomepage from "./pages/Home/TilonHomepage";
import Loginpage from "./pages/Admin/Login/Loginpage";
import EditDetail from "./pages/Admin/Pr/EditDetail";
import Sidebar from "./components/common/Sidebar";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/common/Navbar";
import AdminPr from "./pages/Admin/Pr/AdminPr";
import AdminInsight from "./pages/Admin/Insight/AdminInsight";
import PrivateRoute from "./components/PrivateRoute";
import UserListPage2 from "./pages/Admin/UserListPage/UserListPage2";
import PostEdit from "./pages/Admin/PostEdit/PostEdit";
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
                    element={<PrivateRoute element={<PostEdit />} />}
                  />

                  <Route
                    path="/pr/write"
                    element={<PrivateRoute element={<PostWrite />} />}
                  />

                  <Route
                    path="/insight"
                    element={<PrivateRoute element={<AdminInsight />} />}
                  />

                  <Route
                    path="/insight/:postId"
                    element={<PrivateRoute element={<PostEdit />} />}
                  />

                  <Route
                    path="/insight/write"
                    element={<PrivateRoute element={<PostWrite />} />}
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
