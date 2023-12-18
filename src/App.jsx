// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Assurez-vous d'importer correctement votre composant Home

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Ajoutez d'autres routes ici selon votre structure */}
      </Routes>
    </Router>
  );
}

export default App;
