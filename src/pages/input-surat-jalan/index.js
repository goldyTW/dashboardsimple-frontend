import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { Input, Button } from 'antd';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const InputSuratJalan = () => {
  const [nomor, setNomor] = useState();
  const [plat, setPlat] = useState();
  const [supir, setSupir] = useState();
  const [hpSupir, setHpSupir] = useState();
  const [loading, setLoading] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL;
  const data = {nomor, plat, supir, hpSupir}

  useEffect(() => {
    //aksdjfjdsf
  })

  function handleInputSuratJalan() {
    setLoading(true)
    if(!nomor) {
      setLoading(false)
      toast.error("")
    } else if(!plat) {
      setLoading(false)
      toast.error("Nomor plat tidak boleh kosong")
    } else if(!supir) {
      setLoading(false)
      toast.error("Nama Supir tidak boleh kosong")
    } else if(!hpSupir) {
      setLoading(false)
      toast.error("Nomor HP Supir tidak boleh kosong")
    } else {
      navigate('/', {replace: true});
    }
  }
  return (
    <div className="main">
      <div className={sidebarOpen ? "mainSideLayoutFull" : "mainSideLayoutNotFull" }>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      </div>
      <div className={sidebarOpen ? "mainNavLayoutNotFull" : "mainNavLayoutFull" }>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 align-self-center text-center">     
            <h1 className="pageTitle mt-5">Input <b>Surat Jalan</b></h1>
          </div>  
          <div className="card col-md-7 col-12">
            <div className="row justify-content-center">
              <div className="col-md-8 col-10 py-2 px-4">
                <p className="left-align">No. Surat Jalan</p>
                <Input 
                  className="py-2"
                  placeholder="No. Surat Jalan"
                  // style={{ width:"100%", height: "32.19px", backgroundColor: "silver" }}
                  disabled="true"
                  value={nomor}
                  onChange={(e)=>setNomor(e.target.value)}
                  />
              </div> 
              <div className="col-md-8 col-10 py-2 px-4">
                <p className="left-align">No. Plat Mobil/Motor</p>
                <Input 
                  className="py-2"
                  placeholder="No. Plat"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={plat}
                  onChange={(e)=>setPlat(e.target.value)}
                  />
              </div> 
              <div className="col-md-8 col-10 py-2 px-4">
                <p className="left-align">Supir/Kenek</p>
                <Input 
                  className="py-2"
                  placeholder="Supir"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={supir}
                  onChange={(e)=>setSupir(e.target.value)}
                  />
              </div> 
              <div className="col-md-8 col-10 py-2 px-4">
                <p className="left-align">No HP Supir/Kenek</p>
                <Input 
                  className="py-2"
                  placeholder="No HP Supir"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={hpSupir}
                  type="number"
                  onChange={(e)=>setHpSupir(e.target.value)}
                  />
              </div>
              <div className="col-md-8 col-10 py-2 px-4 text-center">
              {
              !loading ? 
                <Button className="submit" type="primary" size="large" onClick={() => handleInputSuratJalan()}>Buat Surat Jalan</Button>
                :
                <div className='spiner'>
                  <div className="loading-spinner"></div> <div className='ms-1' 
                    style={{fontFamily:'Inter', color: '#606060'}}>Mohon Tunggu</div>
                </div>
              } 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputSuratJalan;