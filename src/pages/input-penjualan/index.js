import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
// import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Input, DatePicker, Space, Radio, Button, Select } from 'antd';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";
import { Icon } from "@iconify/react";

const InputPenjualan = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let url = process.env.REACT_APP_API_URL ;
  const [barang, setBarang] = useState();
  const [qty, setQty] = useState();
  const [hargaJual, setHargaJual] = useState();
  const totalHarga = qty * hargaJual
  // const [jumlah, setJumlah] = useState();
  const [customer, setCustomer] = useState();
  const [alamat, setAlamat] = useState();
  const [tglTransaksi, setTglTransaksi] = useState();
  const [tglKirim, setTglKirim] = useState();
  const [sales, setSales] = useState();
  const [tempoBtn, setTempoBtn] = useState(1);
  const [tempo, setTempo] = useState("0");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mengambil data dari Axios untuk Select
  const [dataBarang, setDataBarang] = useState();
  const [dataCustomer, setDataCustomer] = useState();
  const [dataSales, setDataSales] = useState();

  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';
  
  const handleDateTransaksiChange = (date, dateString) => {
    setTglTransaksi(date);
  }

  const handleDateKirimChange = (date, dateString) => {
    setTglKirim(date);
  }
  
  const isTempoDisable = tempoBtn === 1;

  //Fitur Select
  const onChange = (value, label) => {
    console.log(`selected ${value} with name ${label.label}`);
    setCustomer(value)
    axios.get(`${url}/listcustomer`)
      .then(res => {
        // console.log(res) // buat liat return datanya
        const selectedCustomer = res.data.find(item => item.id_customer === value)

        if (selectedCustomer) {
          const alamatData = [{
            value: selectedCustomer.id_customer,
            label: selectedCustomer.alamat1,
          }];
          setAlamat(alamatData)
        } else {
          console.error(`Customer ${value} tidak ditemukan`);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if(!Cookies.get('user-data')){
        //   navigate('/login', { replace: true });
        // }
        // ambil list barang
        const barangResponse = await axios.get(`${url}/listbarang/listbarang`);
        // console.log(barangResponse.data);
        setDataBarang(barangResponse.data.map(item => ({
          value: item.id_barang,
          label: item.nama_barang,
        })));
  
        // ambil list customer
        const customerResponse = await axios.get(`${url}/listcustomer`);
        // console.log(customerResponse.data);
        setDataCustomer(customerResponse.data.map(item => ({
          value: item.id_customer,
          label: item.nama,
        })));
  
        // ambil list sales
        const salesResponse = await axios.get(`${url}/listsales`, {
          timeout: 10000,
        });
        // console.log(salesResponse.data);
        setDataSales(salesResponse.data.map(item => ({
          value: item.id_sales,
          label: item.nama,
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  

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
      } else if(!customer) {
          setLoading(false)
          toast.error("Customer tidak boleh kosong")
      } else if(!alamat) {
          setLoading(false)
          toast.error("Alamat tidak boleh kosong")
      } else if(!sales) {
        setLoading(false)
          toast.error("Sales tidak boleh kosong")
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
        navigate('/penjualan', {replace: true});
        const dataTglTransaksi = tglTransaksi.format('YYYY-MM-DD HH:mm:ss')
        const dataTglKirim = tglKirim.format('YYYY-MM-DD HH:mm:ss')
        axios.post(`${url}/penjualan/create`, {
          id_barang: barang,
          jumlah: qty,
          potongan: 0,
          total: totalHarga,
          id_customer: customer,
          waktu_penjualan: dataTglTransaksi,
          waktu_pengiriman: dataTglKirim,
          id_sales: sales,
          status_kirim: "PENDING",
          id_user: "1",
          tempo: tempo
        },  {
          headers: {
            'Content-Type': 'application/json',
          },
        }) 
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error.response.data);
        });
      }
  }

  function add(){

  }

  return (
    <div className="main">
    <div className={sidebarOpen ? "mainSideLayoutFull" : "mainSideLayoutNotFull" }>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
    </div>
    <div className={sidebarOpen ? "mainNavLayoutNotFull" : "mainNavLayoutFull" }>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <div className="row mt-5">
          <div className="col-12 col-md-6 breadcrumbs">   
            <Link to="/penjualan"><span>Penjualan</span></Link> <span>{'>>'}</span> <span>Input</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 align-self-center">     
            <div className="row justify-content-center">
              <h1 className="pageTitle col-md-6 mt-3 align-self-center">Input <b>Penjualan</b></h1>
              <div className="col-md-6 col-10 align-self-center text-end">
              {
              !loading ? 
                <Button className="submit" type="primary" size="large" onClick={() => handleInputPenjualan()}>Simpan Penjualan</Button>
                :
                <div className='spiner'>
                  <div className="loading-spinner"></div> <div className='ms-1' 
                    style={{fontFamily:'Inter', color: '#606060'}}>Mohon Tunggu</div>
                </div>
              }
              </div>
            </div>
          </div>  
          <div className="col-md-5 col-12">
            <div className="card p-4 mt-2 mb-3">
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
                <div className="col-md-12 col-10 px-3 py-2 text-center">
                  <span className='tambahData' onClick={()=>add()}>
                    <Icon icon="material-symbols:add-circle" width={15}/> Tambah Barang
                  </span>
                </div>
              </div>
            </div>
            <div className="card p-4 mt-3 mb-2">
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
                  {
                    tempoBtn == 2 && 
                    <Input 
                    className="py-2"
                    placeholder=""
                    // style={{ width:"100%", height: "32.19px" }}
                    value={tempo}
                    onChange={(e)=>setTempo(e.target.value)}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12 mt-3">
            <div className='row justify-content-center text-center' style={{fontWeight:500}}>
                <div className='col-lg-1 py-3' style={{border:'0.5px solid #d0d0d0', backgroundColor:'#f8f8f8', borderRadius:'10px 0 0 0'}}>No</div>
                <div className='col-lg-4 py-3' style={{border:'0.5px solid #d0d0d0', backgroundColor:'#f8f8f8'}}>Nama Barang</div>
                <div className='col-lg-1 py-3' style={{border:'0.5px solid #d0d0d0', backgroundColor:'#f8f8f8'}}>Qty</div>
                <div className='col-lg-2 py-3' style={{border:'0.5px solid #d0d0d0', backgroundColor:'#f8f8f8'}}>Harga Jual</div>
                <div className='col-lg-2 py-3' style={{border:'0.5px solid #d0d0d0', backgroundColor:'#f8f8f8'}}>Jumlah</div>
                <div className='col-lg-1 py-3' style={{border:'0.5px solid #d0d0d0', backgroundColor:'#f8f8f8', borderRadius:'0 10px 0 0'}}>Action</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputPenjualan;