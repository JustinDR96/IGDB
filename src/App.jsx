import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import DetailsGames from "./pages/DetailsGames/DetailsGames";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/games/:id" element={<DetailsGames />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
