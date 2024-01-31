import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import DetailsGames from "./pages/DetailsGames/DetailsGames";
import SearchGames from "./pages/SearchGames/SearchGames";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/games/:id" element={<DetailsGames />} />
        <Route path="/search/:name" element={<SearchGames />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
