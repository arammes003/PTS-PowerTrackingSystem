import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./styles/App.css";

import { LoginRegister } from "./pages/LoginRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
