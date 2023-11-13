import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Input, DatePicker, Space, Radio, Button } from 'antd';

const InputStok = () => {
  const [no_faktur, setNoFaktur] = useState();
  const [kode_barang, setKodeBarang] = useState();
  const [color_way, setColorWay] = useState();
  const [harga_beli, setHargaBeli] = useState();
  const [harga_jual, setHargaJual] = useState();
  const [nama_barang, setNamaBarang] = useState();
  const [design, setDesign] = useState();
  const [jumlah_masuk, setJumlahMasuk] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';
  let url = process.env.REACT_APP_API_URL;
  const data = {no_faktur, kode_barang, color_way, harga_beli, harga_jual, nama_barang, design, jumlah_masuk, note}
  
  useEffect(() => {
      // if(!Cookies.get('user-data')){
      //   navigate('/login', { replace: true });
      // }
  }, [])
  
  function handleInputStok() {
      setLoading(true)
      if(!no_faktur) {
          setLoading(false)
          toast.error("No Faktur tidak boleh kosong")
      } else if(!kode_barang) {
          setLoading(false)
          toast.error("Kode Barang tidak boleh kosong")
      } else if(!color_way) {
          setLoading(false)
          toast.error("Color Way barang tidak boleh kosong")
      } else if(!harga_beli) {
          setLoading(false)
          toast.error("Harga Beli tidak boleh kosong")
      } else if(!harga_jual) {
          setLoading(false)
          toast.error("Harga Jual tidak boleh kosong")
      } else if(!nama_barang) {
          setLoading(false)
          toast.error("Nama Barang tidak boleh kosong")
      } else if(!design) {
        setLoading(false)
        toast.error("Design tidak boleh kosong")
      } else if(!jumlah_masuk) {
        setLoading(false)
        toast.error("Jumlah Masuk tidak boleh kosong")
      } else {
          navigate('/', {replace: true});
      }
  }
  return (
    <div className="main">
      <div className="wrapper">
        <p className="pageTitle">Input <b>Stok Barang</b></p>
        <div className="card col-md-10 col-12">
          <div className="row justify-content-center">
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Nomor Faktur</p>
              <Input 
                className="py-2"
                placeholder="Nomor Faktur"
                style={{ width:"100%", height: "32.19px" }}
                value={no_faktur}
                onChange={(e)=>setNoFaktur(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Kode Barang</p>
              <Input 
                className="py-2"
                placeholder="Kode Barang"
                style={{ width:"100%", height: "32.19px" }}
                value={kode_barang}
                onChange={(e)=>setKodeBarang(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Color Way</p>
              <Input 
                className="py-2"
                placeholder="Color Way"
                style={{ width:"100%", height: "32.19px" }}
                value={color_way}
                onChange={(e)=>setColorWay(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Harga Beli</p>
              <Input 
                className="py-2"
                placeholder="Harga Beli"
                style={{ width:"100%", height: "32.19px" }}
                value={harga_beli}
                onChange={(e)=>setHargaBeli(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Harga Jual</p>
              <Input 
                className="py-2"
                placeholder="Harga Jual"
                style={{ width:"100%", height: "32.19px" }}
                value={harga_jual}
                onChange={(e)=>setHargaJual(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Nama Barang</p>
              <Input 
                className="py-2"
                placeholder="Nama Barang"
                style={{ width:"100%", height: "32.19px" }}
                value={nama_barang}
                onChange={(e)=>setNamaBarang(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Design</p>
              <Input 
                className="py-2"
                placeholder="Design"
                style={{ width:"100%", height: "32.19px" }}
                value={design}
                onChange={(e)=>setDesign(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Jumlah Masuk</p>
              <Input 
                className="py-2"
                placeholder="Jumlah Masuk"
                style={{ width:"100%", height: "32.19px" }}
                value={jumlah_masuk}
                onChange={(e)=>setJumlahMasuk(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Note</p>
              <Input 
                className="py-2"
                placeholder="Note"
                style={{ width:"100%", height: "32.19px" }}
                value={note}
                onChange={(e)=>setNote(e.target.value)}
                />
            </div>
          </div>
          {
          !loading ? 
            <Button className="submit" type="primary" size="large" onClick={() => handleInputStok()}>Submit!</Button>
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

export default InputStok;