import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./styles/App.css";

import { LoginRegister } from "./pages/LoginRegister";
import { Home } from "./pages/Home";
import { Atletas } from "./pages/Atletas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/atletas" element={<Atletas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
