import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Input, DatePicker, Space, Radio, Button } from 'antd';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const InputPenjualan = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let url = process.env.REACT_APP_API_URL ;
  const [barang, setBarang] = useState();
  const [qty, setQty] = useState();
  const [hargaJual, setHargaJual] = useState();
  const totalHarga = qty * hargaJual
  const [customer, setCustomer] = useState();
  const [alamat, setAlamat] = useState();
  const [tglTransaksi, setTglTransaksi] = useState();
  const [tglKirim, setTglKirim] = useState();
  const [sales, setSales] = useState();
  const [tempoBtn, setTempoBtn] = useState(1);
  const [tempo, setTempo] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';
  const data = {barang, qty, hargaJual, customer, alamat, tglTransaksi, tglKirim, sales, tempo}
  
  const handleDateTransaksiChange = (date, dateString) => {
    setTglTransaksi(date);
  }

  const handleDateKirimChange = (date, dateString) => {
    setTglKirim(date);
  }



  useEffect(() => {
      // if(!Cookies.get('user-data')){
      //   navigate('/login', { replace: true });
      // }
  }, [])
  
  function handleInputPenjualan() {
      setLoading(true)
      if(!barang) {
          setLoading(false)
          toast.error("Barang tidak boleh kosong")
      } else if(!qty) {
          setLoading(false)
          toast.error("Jumlah barang tidak boleh kosong")
      } else if(!hargaJual) {
          setLoading(false)
          toast.error("Harga jual barang tidak boleh kosong")
      } else if(!alamat) {
          setLoading(false)
          toast.error("Alamat tidak boleh kosong")
      } else if(!tglTransaksi) {
          setLoading(false)
          toast.error("Tanggal transaksi tidak boleh kosong")
      } else if(!tglKirim) {
          setLoading(false)
          toast.error("Tanggal kirim tidak boleh kosong")
      } else if(!tempo) {
        setLoading(false)
        toast.error("Tempo tidak boleh kosong")
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
      <div className="row">
      <div className="col-12 col-md-6 align-self-center">     
            <h1 className="pageTitle mt-5">Input Penjualan</h1>
          </div>  
        <div className="card col-md-10 col-12">
          <div className="row justify-content-center">
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Barang</p>
              <Input 
                className="py-2"
                placeholder="Barang"
                // style={{ width:"100%", height: "32.19px" }}
                value={barang}
                onChange={(e)=>setBarang(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Qty</p>
              <Input 
                className="py-2"
                placeholder="Qty"
                // style={{ width:"100%", height: "32.19px" }}
                value={qty}
                onChange={(e)=>setQty(e.target.value)}
                />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Harga Jual</p>
              <Input 
                className="py-2"
                placeholder="Harga"
                // style={{ width:"100%", height: "32.19px" }}
                value={hargaJual}
                onChange={(e)=>setHargaJual(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 px-3 py-2">
              <p className="left-align">Jumlah</p>
              <Input 
                className="py-2"
                placeholder="Jumlah"
                // style={{ width:"100%", height: "32.19px", backgroundColor: "silver" }}
                value={totalHarga? totalHarga : 0}
                disabled
                // onChange={(e)=>setTotalHarga(e.target.value)}
                />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-10 py-2 px-3">
              <p className="left-align">Customer</p>
              <Input 
                className="py-2"
                placeholder="Nama Customer"
                // style={{ width:"100%", height: "32.19px" }}
                value={customer}
                onChange={(e)=>setCustomer(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 py-2 px-3">
              <p className="left-align">Alamat</p>
              <Input 
                className="py-2"
                placeholder="Alamat"
                // style={{ width:"100%", height: "32.19px" }}
                value={alamat}
                onChange={(e)=>setAlamat(e.target.value)}
                />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-10 py-2 px-3">
              <p className="left-align">Tanggal Transaksi</p>
              <Space direction="vertical" >
                <DatePicker 
                  format={dateFormat}
                  style={{ width: "100%" }}
                  value={tglTransaksi}
                  onChange={handleDateTransaksiChange}
                  />
              </Space>
            </div>
            <div className="col-md-6 col-10 py-2 px-3">
              <p className="left-align">Tanggal kirim</p>
              <Space direction="vertical" >
                <DatePicker 
                  format={dateFormat}
                  style={{ width: "100%" }}
                  value={tglKirim}
                  onChange={handleDateKirimChange}
                  />
              </Space>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-10 py-2 px-3">
              <p className="left-align">Sales</p>
              <Input 
                className="py-2"
                placeholder="Nama Sales"
                // style={{ width:"100%", height: "32.19px" }}
                value={sales}
                onChange={(e)=>setSales(e.target.value)}
                />
            </div>
            <div className="col-md-6 col-10 py-2 px-3">
              <p className="left-align">Tempo (hari)</p>
              <Radio.Group value={tempoBtn} onChange={(e) => setTempoBtn(e.target.value)}>
                <Radio value={1}>Cash</Radio>
                <Radio value={2}>Tempo</Radio>
              </Radio.Group>
              <Input 
                className="py-2"
                placeholder=""
                // style={{ width:"100%", height: "32.19px" }}
                value={tempo}
                onChange={(e)=>setTempo(e.target.value)}
                />
            </div>
          </div>
          {
          !loading ? 
            <Button className="submit" type="primary" size="large" onClick={() => handleInputPenjualan()}>Tambah</Button>
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
  )
}

export default InputPenjualan;