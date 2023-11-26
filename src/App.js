import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Stok from "./pages/Stok";
import Penjualan from "./pages/Penjualan";
import InputStok from "./pages/input-stok";
import InputPenjualan from "./pages/input-penjualan";
import InputSuratJalan from "./pages/input-surat-jalan";
import SuratJalan from "./pages/surat-jalan";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="stok">
              <Route index element={<Stok />}/>
              <Route path="input" element={<InputStok />} />
              <Route path="edit/:id" element={<InputStok />} />
            </Route>
            <Route path="penjualan">
              <Route index element={<Penjualan />}/>
              <Route path="input" element={<InputPenjualan />} />
              <Route path="edit/:id" element={<InputPenjualan />} />
            </Route>
          </Route>
          <Route path="input-surat-jalan" element={<InputSuratJalan />} />
          <Route path="surat-jalan" element={<SuratJalan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
