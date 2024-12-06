import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/Home/TilonHomepage.jsx";
import Loginpage from "./pages/Admin/Login/Loginpage.jsx";

import PostEditor from "./pages/Admin/PostEdit/PostEditor.jsx";
import AdminHome from "./pages/Admin/AdminMain/AdminMain.jsx";
// import Adminpage from './pages/Admin/AdminList/Adminpage.jsx';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<TilonHomepage />}></Route>
          <Route path="/admin/login" element={<Loginpage />}></Route>
          <Route path="/admin/edit" element={<PostEditor/>}></Route>
          {/* <Route path="/admin/page" element={<Adminpage />}></Route> */}
          <Route path="/admin" element={<AdminHome />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
