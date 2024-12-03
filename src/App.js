import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/TilonHomepage";
import Loginpage from "./components/Loginpage";
import PrInsight from './pages/PrInsight/PrInsight';

import Adminpage from './pages/Adminpage';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={ <TilonHomepage/>}></Route>
        <Route path="/login/admin" element={ <Loginpage/>}></Route>
        <Route path="/prsection" element={ <PrInsight/>}></Route>
        <Route path="/admin/home" element={<Adminpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
