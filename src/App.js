import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/Home/TilonHomepage.jsx";
import Loginpage from "./pages/Admin/Login/Loginpage.jsx";
import PrInsight from './pages/Home/PrInsight/PrInsight.jsx';


import AdminHome from './pages/Admin/Home/AdminHome.jsx';
import Adminpage from './pages/Admin/AdminList/Adminpage.jsx';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<TilonHomepage />}></Route>
          <Route path="/admin/login" element={<Loginpage />}></Route>
          {/* <Route path="/prsection" element={<PrInsight />}></Route> */}
          {/* <Route path="/admin/home" element={<Adminpage />}></Route> */}
          <Route path="/admin/home" element={<AdminHome />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
