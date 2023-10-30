import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Stok from "./pages/Stok";
import Penjualan from "./pages/Penjualan";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="login" element={<Login />} />
          <Route path="stok" element={<Stok />} />
          <Route path="penjualan" element={<Penjualan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
