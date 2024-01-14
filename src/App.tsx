import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import Search from "./components/Search/Search";
import Trending from "./components/Trending/Trending";
import FrontPage from "./components/FrontPage/FrontPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Trending />} />
          <Route path="/" element={<FrontPage />} />
          <Route path="/movie/:movieId" element={<SingleMovie />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
