import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/TilonHomepage";
import Loginpage from "./Components/Loginpage";
import PrInsight from './pages/PrInsight/PrInsight';


import AdminHome from './admin/adminhome/AdminHome.jsx';
import EditProfile from './admin/components/EditProfile.jsx';
import EditPr from './admin/components/EditPr.jsx';
import Adminpage from './pages/Adminpage';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/home" element={<TilonHomepage />}></Route>
          <Route path="/login/admin" element={<Loginpage />}></Route>
          <Route path="/prsection" element={<PrInsight />}></Route>
          <Route path="/admin/page" element={<Adminpage />}></Route>
          <Route path="/home/admin" element={<AdminHome />}></Route>
          <Route path="/edit-profile/admin" element={<EditProfile />}></Route>
          <Route path="/edit-pr/admin" element={<EditPr/>}></Route>
          </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
