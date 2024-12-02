import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TilonHomepage from "./pages/TilonHomepage";
import PrInsight from './pages/PrInsight/PrInsight';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={ <TilonHomepage/>}></Route>
        <Route path="/prsection" element={ <PrInsight/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
