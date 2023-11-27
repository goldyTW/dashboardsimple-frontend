import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { Input, Table, Card } from 'antd';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import { Icon } from "@iconify/react";

const Penjualan = () => {
  const location = useLocation();
  const last = location.pathname.split("/")
  const active = last[1];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])  //variabel
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ; //variable

  useEffect(() => {
    if(!Cookies.get('user-data')){
      navigate('/login', { replace: true });
    }
    axios.get(`${url}/listpenjualan/listpenjualan`)
    .then(res => {
        setData(res.data.map(item => ({
          nama_barang: item.nama_barang,
          waktu_penjualan: item.waktu_penjualan,
          waktu_pengiriman: item.waktu_pengiriman,
          jumlah: item.total,
          customer: item.customer,
          alamat: item.alamat,
          tempo: item.tempo,
          status_kirim: item.status_kirim,
          sales: item.sales,
        })))
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
  }, [])

  function handlePrint(id){
    
  }

  const columnPenjualan= [
    { dataIndex: "No", 
      title: "No", 
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 40,
      render: ((value, item, index) => index += 1)
    },
    {
      dataIndex: "nama_barang",
      title: "Nama Barang",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 120,
      sorter: (a, b) => {return a.nama_barang.localeCompare(b.nama_barang)}, //string
    },
    {
      dataIndex: "waktu_penjualan", //buat nyambungin data
      title: "Tanggal Penjualan",
      sortDirections: ['ascend', 'descend'],  // sort nya bisa apa aja
      align:'center',
      width: 90, //lebar kolom
      sorter:(a,b) => a.waktu_penjualan - b.waktu_penjualan,  //integer atau date
      render: ((_, record) => ( moment(record.waktu_penjualan).format('DD-MM-YY') ))
    },
    {
      dataIndex: "waktu_pengiriman",
      title: "Tanggal Pengiriman",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 90,
      sorter:(a,b) => a.waktu_pengiriman - b.waktu_pengiriman,
      render: ((_, record) => ( moment(record.waktu_pengiriman).format('DD-MM-YY') ))
    },
    {
      dataIndex: "jumlah",
      title: "Jumlah Pembelian",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter: (a, b) => a.jumlah - b.jumlah,
      render:((_, record) => (record.jumlah).toLocaleString('id'))
    },
    {
      dataIndex: "customer",
      title: "Customer",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 90,
      // sorter: (a, b) => {return a.customer.localeCompare(b.customer)},
    },
    {
      dataIndex: "alamat",
      title: "Alamat Kirim",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 150,
    },
    {
      dataIndex: "tempo",
      title: "Tempo",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 70,
    },
    {
      dataIndex: "status_kirim",
      title: "Status Kirim",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 80,
      sorter: (a, b) => {return a.status_kirim.localeCompare(b.status_kirim)},
      render: ((_, record) => (
          <span style={{color: (record.status_kirim == "Pending" ? '#F2A40D' : '#60D19B' )}}>{record.status_kirim}</span>
      ))
    },
    {
      dataIndex: "sales",
      title: "Sales",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
    },
    {
      field: "action",
      title: "Surat Jalan",
      width: 120,
      align:'center',
      render: (_, record) => {
        return (
          <div className="cellAction">
            <div className="editButton" onClick={() => handleCreate(record)}>
              {/* <Icon icon="heroicons:pencil-solid" width={16}/>  */}
              Buat
            </div>
            <div className="printButtonDisabled" onClick={() => handlePrint(record.id_device)}>
              {/* <Icon icon="ph:printer-fill" width={16}></Icon>  */}
              Print
            </div>
            
          </div>
        );
      },
    },
  ];

  return (
    <div className="main">
      <div className={sidebarOpen ? "mainSideLayoutFull" : "mainSideLayoutNotFull" }>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      </div>
      <div className={sidebarOpen ? "mainNavLayoutNotFull" : "mainNavLayoutFull" }>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="row"> 
          <div className="col-12 col-md-6 align-self-center">     
            <h1 className="pageTitle mt-xl-3 mt-5"><b>Penjualan</b></h1>
          </div>  
          <div className="col-12 col-md-6 text-end pt-xl-2">  
            <Link to={"/penjualan/input"}> 
              <button className="tambahButton my-4 align-self-center">
              <Icon icon="gridicons:add" className='me-1' width={20}/>
                Tambah Penjualan</button>
            </Link>
          </div>
        {
           !loading ? 
           <Table
            columns={columnPenjualan}
            dataSource={data}
            pagination={false}
            scroll={{ y: 380 }}
            // defaultSortOrder= 'descend'
            bordered
            size='small'
            className="tablePenjualan"
            // className="tableDaily virtual-table"
          />
          :
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        }
      </div>
    </div>
    </div>
  )
}

export default Penjualan