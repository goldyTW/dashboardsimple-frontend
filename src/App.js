import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Stok from "./pages/Stok";
import Penjualan from "./pages/Penjualan";
import InputPenjualan from "./pages/InputPenjualan";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="stok" element={<Stok />} />
            <Route path="penjualan">
              <Route index element={<Penjualan />}/>
              <Route path="input" element={<InputPenjualan />} />
              <Route path="edit/:id" element={<InputPenjualan />} />
            </Route>
            
          </Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
