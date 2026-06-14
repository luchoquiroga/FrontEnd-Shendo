import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si alguien entra a la raíz "/", lo mandamos directo al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Nuestras pantallas reales */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}