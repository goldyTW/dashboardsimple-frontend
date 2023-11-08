import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { Input, Button } from 'antd';

const InputSuratJalan = () => {
  const [nomor, setNomor] = useState();
  const [plat, setPlat] = useState();
  const [supir, setSupir] = useState();
  const [hpSupir, setHpSupir] = useState();
  const [loading, setLoading] = useState();
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
      <div className="wrapper">
        <p className="pageTitle">Data <b>Surat Jalan</b></p>
        <div className="card pt-4 pb-4">
          <div className="col-md-8 col-10 py-2 px-4" style={{width: "100%"}}>
            <p className="left-align">No. Surat Jalan</p>
            <Input 
              className="py-2"
              placeholder="No. Surat Jalan"
              style={{ width:"100%", height: "32.19px", backgroundColor: "silver" }}
              disabled="true"
              value={nomor}
              onChange={(e)=>setNomor(e.target.value)}
              />
           </div> 
           <div className="col-md-8 col-10 py-2 px-4" style={{width: "100%"}}>
            <p className="left-align">No. Plat Mobil/Motor</p>
            <Input 
              className="py-2"
              placeholder="No. Plat"
              style={{ width:"100%", height: "32.19px" }}
              value={plat}
              onChange={(e)=>setPlat(e.target.value)}
              />
           </div> 
           <div className="col-md-8 col-10 py-2 px-4" style={{width: "100%"}}>
            <p className="left-align">Supir/Kenek</p>
            <Input 
              className="py-2"
              placeholder="Supir"
              style={{ width:"100%", height: "32.19px" }}
              value={supir}
              onChange={(e)=>setSupir(e.target.value)}
              />
           </div> 
           <div className="col-md-8 col-10 py-2 px-4" style={{width: "100%"}}>
            <p className="left-align">No HP Supir/Kenek</p>
            <Input 
              className="py-2"
              placeholder="No HP Supir"
              style={{ width:"100%", height: "32.19px" }}
              value={supir}
              onChange={(e)=>setHpSupir(e.target.value)}
              />
           </div>
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
  )
}

export default InputSuratJalan;