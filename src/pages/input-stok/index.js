import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Input, Button, Select , AutoComplete} from 'antd';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const InputStok = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [no_faktur, setNoFaktur] = useState();
  const [kode_barang, setKodeBarang] = useState();
  const [color_way, setColorWay] = useState();
  const [harga_beli, setHargaBeli] = useState();
  const [harga_jual, setHargaJual] = useState();
  const [nama_barang, setNamaBarang] = useState();
  const [id_barang, setIdBarang] = useState();
  const [design, setDesign] = useState();
  const [jumlah_masuk, setJumlahMasuk] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';
  let url = process.env.REACT_APP_API_URL;
  const data = {no_faktur, kode_barang, color_way, harga_beli, harga_jual, nama_barang, design, jumlah_masuk, note}
  
  // Mengambil data dari Axios untuk Select (menampung data sementara untuk nanti dioper ke const utama)
  const [dataBarang, setDataBarang] = useState();
  const [dataKode, setDataKode] = useState();
  const [dataDesign, setDataDesign] = useState();
  const [dataColor, setDataColor] = useState()

  const onChange = (value, label) => {
    console.log(`selected ${value} with name ${label.label}`);
    if(label.label === undefined) {
      setNamaBarang(value)
      console.log(nama_barang)
    } else {
    setIdBarang(value)
    setNamaBarang(label.label)
    console.log(nama_barang)
    axios.get(`${url}/listbarang/listbarang`)
      .then(res => {
        // console.log(res) // buat liat return datanya
        const selectedBarang = res.data.find(item => item.id_barang === Number(value))

        if (selectedBarang) {
          const kodeData = [{
            value: selectedBarang.id_barang.toString(),
            label: selectedBarang.kode,
          }];
          const designData = [{
            value: selectedBarang.id_barang.toString(),
            label: selectedBarang.design,
          }]
          const colorData = [{
            value: selectedBarang.id_barang.toString(),
            label: selectedBarang.color_way,
          }]
          setDataKode(kodeData);
          setDataDesign(designData);
          setDataColor(colorData);
        } else {
          console.error(`Barang ${value} tidak ditemukan`);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if(!Cookies.get('user-data')){
        //   navigate('/login', { replace: true });
        // }
        // ambil list barang
        const BarangResponse = await axios.get(`${url}/listbarang/listbarang`);
        // console.log(barangResponse.data);
        setDataBarang(BarangResponse.data.map(item => ({
          value: item.id_barang.toString(),
          label: item.nama_barang,
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, [])
  
  function handleInputStok() {
      setLoading(true)
      if(!nama_barang) {
          setLoading(false)
          toast.error("Nama Barang tidak boleh kosong")
      } else if(!no_faktur) {
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
      } else if(!design) {
        setLoading(false)
        toast.error("Design tidak boleh kosong")
      } else if(!jumlah_masuk) {
        setLoading(false)
        toast.error("Jumlah Masuk tidak boleh kosong")
      } else {
        navigate('/', {replace: true});
        const postData = async () => {
          try {
            const responseBarang = await axios.post(`${url}/barang/create`, {
              no_faktur: no_faktur,
              nama: nama_barang,
              kode: kode_barang,
              design: design,
              color_way: color_way,
              width: 100,
              note: note,
              jumlah: jumlah_masuk,
              harga_jual: harga_jual,
              batas_stok: 100,
              id_supplier: "1",
              id_gudang: 2
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log(responseBarang.data);

            if(!id_barang) {
              // ambil id data terbaru untuk barang masuk yang baru
              const idTerbaru = await axios.get(`${url}/listbarang/listbarang`)
              const lastData = idTerbaru.data[idTerbaru.data.length - 1].id_barang;
              console.log(lastData)

              const responseBarangMasuk = await axios.post(`${url}/barang_masuk/create`, {
                nomor_faktur: no_faktur,
                jumlah: jumlah_masuk,
                harga_beli: harga_beli,
                note: note,
                id_barang: lastData,
                id_user: 2
              }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              console.log(responseBarangMasuk);
            } else {
              const responseBarangMasuk = await axios.post(`${url}/barang_masuk/create`, {
                nomor_faktur: no_faktur,
                jumlah: jumlah_masuk,
                harga_beli: harga_beli,
                note: note,
                id_barang: id_barang,
                id_user: 2
              }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              console.log(responseBarangMasuk);
            }
        
          } catch (error) {
            console.error(error.response ? error.response.data : error.message);
          }
        };
        
        postData();
      }
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
            <Link to="/stok"><span>Stok</span></Link> <span>{'>>'}</span> <span>Input</span>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 align-self-center text-center">     
            <h1 className="pageTitle mt-3">Input <b>Stok</b></h1>
          </div>  
          <div className="card col-md-10 col-12">
            <div className="row justify-content-center">
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Nama Barang</p>
                <AutoComplete
                  showSearch
                  placeholder="Nama Barang"
                  optionFilterProp="children"
                  style={{ width:"100%" }}
                  onChange={onChange}
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={dataBarang}
                  value={nama_barang}
                />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Nomor Faktur</p>
                <Input 
                  className="py-2"
                  placeholder="Nomor Faktur"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={no_faktur}
                  onChange={(e)=>setNoFaktur(e.target.value)}
                  />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Kode Barang</p>
                <AutoComplete 
                  showSearch
                  placeholder="Kode Barang"
                  optionFilterProp="children"
                  style={{ width:"100%" }}
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={dataKode}
                  value={kode_barang}
                  onChange={(value, label) => label? setKodeBarang(value) : setKodeBarang(label.label)}
                />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Color Way</p>
                <AutoComplete
                  showSearch
                  placeholder="Color Way"
                  optionFilterProp="children"
                  style={{ width:"100%" }}
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={dataColor}
                  value={color_way}
                  onChange={(value, label) => label? setColorWay(value) : setColorWay(label.label)}
                />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Harga Beli</p>
                <Input 
                  className="py-2"
                  placeholder="Harga Beli"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={harga_beli}
                  onChange={(e)=>setHargaBeli(e.target.value)}
                  />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Harga Jual</p>
                <Input 
                  className="py-2"
                  placeholder="Harga Jual"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={harga_jual}
                  onChange={(e)=>setHargaJual(e.target.value)}
                  />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Design</p>
                <AutoComplete 
                  showSearch
                  placeholder="Design"
                  optionFilterProp="children"
                  style={{ width:"100%" }}
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={dataDesign}
                  value={design}
                  onChange={(value, label) => label? setDesign(value) : setDesign(label.label)}
                />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Jumlah Masuk</p>
                <Input 
                  className="py-2"
                  placeholder="Jumlah Masuk"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={jumlah_masuk}
                  onChange={(e)=>setJumlahMasuk(e.target.value)}
                  />
              </div>
              <div className="col-md-6 col-10 px-3 py-2">
                <p className="left-align">Note</p>
                <Input 
                  className="py-2"
                  placeholder="Note"
                  // style={{ width:"100%", height: "32.19px" }}
                  value={note}
                  onChange={(e)=>setNote(e.target.value)}
                  />
              </div>
            </div>
            <div className="col-md-12 col-10 py-2 px-4 text-center">
            {
            !loading ? 
              <Button className="submit" type="primary" size="large" onClick={() => handleInputStok()}>Tambah</Button>
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
  )
}

export default InputStok;