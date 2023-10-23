import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import KonfigurasiJukir from "./pages/config-jukir";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="config-jukir" element={<KonfigurasiJukir></KonfigurasiJukir>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
