import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Scrap from "./pages/Scrap";
import Rss from "./pages/Rss";
import AllRss from "./pages/AllRss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Scrap />} />
          <Route path="/Rss" element={<Rss />} />
          <Route path="/allRss" element={<AllRss />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
