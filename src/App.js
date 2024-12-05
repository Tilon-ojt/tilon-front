import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/Home/TilonHomepage.jsx";
import Loginpage from "./pages/Admin/Login/Loginpage.jsx";
import AdminMain from './pages/Admin/AdminMain/AdminMain.jsx';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<TilonHomepage />}></Route>
          <Route path="/admin/login" element={<Loginpage />}></Route>
          <Route path="/admin/home" element={<AdminMain />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
