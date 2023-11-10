import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Stok from "./pages/Stok";
import Penjualan from "./pages/Penjualan";
import Dashboard from "./pages/Dashboard";
import InputStok from "./pages/input-stok";
import InputPenjualan from "./pages/input-penjualan";
import InputSuratJalan from "./pages/input-surat-jalan";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stok" element={<Stok />} />
          <Route path="penjualan" element={<Penjualan />} />
          <Route path="input-stok" element={<InputStok />} />
          <Route path="input-penjualan" element={<InputPenjualan />} />
          <Route path="input-surat-jalan" element={<InputSuratJalan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
