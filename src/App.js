import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/TilonHomepage";
import Loginpage from "./components/Loginpage";
import PrInsight from './pages/PrInsight/PrInsight';


import AdminHome from './admin/adminhome/AdminHome.jsx';
import EditProfile from './admin/components/EditProfile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={ <TilonHomepage/>}></Route>
        <Route path="/login/admin" element={ <Loginpage/>}></Route>
        <Route path="/prsection" element={ <PrInsight/>}></Route>
        
        {/* 임의로 설정한 라우트 */}
        <Route path="/home/admin" element={ <AdminHome/>}></Route>
        <Route path="/edit-profile/admin" element={ <EditProfile/>}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
