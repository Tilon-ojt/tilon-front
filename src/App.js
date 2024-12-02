import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/TilonHomepage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={ <TilonHomepage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
