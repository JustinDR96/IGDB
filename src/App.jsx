import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import DetailsGames from "./pages/DetailsGames/DetailsGames";
import SearchGames from "./pages/SearchGames/SearchGames";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/games/:id" element={<DetailsGames />} />
        <Route path="/search/:name" element={<SearchGames />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
