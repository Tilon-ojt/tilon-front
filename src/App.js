import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/TilonHomepage";
import Loginpage from "./components/Loginpage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={ <TilonHomepage/>}></Route>
        <Route path="/login/admin" element={ <Loginpage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
