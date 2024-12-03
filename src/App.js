import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/TilonHomepage";
import Loginpage from "./components/Loginpage";
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
          <Route path="/admin/home" element={<Adminpage />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
