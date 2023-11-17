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
import { render } from "@testing-library/react";

const Penjualan = () => {
  const location = useLocation();
  const last = location.pathname.split("/")
  const active = last[1];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])  //variabel
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ; //variable

  // const penjualan = [
  //   {
  //     nama_barang:'kain pramuka',
  //     tanggal_penjualan:'10-10-23',
  //     tanggal_pengiriman:'12-10-23',
  //     jumlah:3000000,
  //     customer:'Pak Haji',
  //     alamat:'blok a pasar tanah abang',
  //     tempo:30,
  //     status_kirim:'PENDING',
  //     sales:'hamdan',
  //   }
  // ]

  useEffect(() => {
    // if(!Cookies.get('user-data')){
    //   navigate('/login', { replace: true });
    // }
    axios.get(`${url}/listpenjualan/listpenjualan`)
    .then(res => {
        console.log(res.data) //buat liat return datanya
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
  function handleOpen(opt, record){
    
  }

  const columnPenjualan= [
    { dataIndex: "No", 
      title: "No", 
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 50,
      render: ((value, item, index) => index += 1)
    },
    {
      dataIndex: "nama_barang",
      title: "Nama Barang",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 150,
      sorter: (a, b) => {return a.nama_barang.localeCompare(b.nama_barang)}, //string
    },
    {
      dataIndex: "waktu_penjualan", //buat nyambungin data
      title: "Tanggal Penjualan",
      sortDirections: ['ascend', 'descend'],  // sort nya bisa apa aja
      align:'center',
      width: 100, //lebar kolom
      sorter:(a,b) => a.waktu_penjualan - b.waktu_penjualan,  //integer atau date
      render: ((_, record) => ( moment(record.waktu_penjualan).format('DD-MM-YY') ))
    },
    {
      dataIndex: "waktu_pengiriman",
      title: "Tanggal Pengiriman",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter:(a,b) => a.waktu_pengiriman - b.waktu_pengiriman,
      render: ((_, record) => ( moment(record.waktu_pengiriman).format('DD-MM-YY') ))
    },
    {
      dataIndex: "jumlah",
      title: "Jumlah",
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
      width: 200,
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
      width: 100,
      sorter: (a, b) => {return a.status_kirim.localeCompare(b.status_kirim)},
      render: ((_, record) => (
          <span style={{color: (record.status_kirim == "PENDING" ? '#F2A40D' : '#60D19BAB' )}}>{record.status_kirim}</span>
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
      title: "Action",
      width: 80,
      align:'center',
      render: (_, record) => {
        return (
          <div className="cellAction">
            {/* <div className="editButton"> */}
            <Icon onClick={() => handleOpen('edit', record)} icon="heroicons:pencil-solid" 
              className='me-1' color="#0A6294" style={{cursor:'pointer'}} width={18}/> 
            {/* </div> */}
            {/* <div className="deleteButton"> */}
              <Icon onClick={() => handlePrint(record.id_device)} icon="ph:printer-fill" 
              className='ms-1' color="#B81212" style={{cursor:'pointer'}} width={18}/> 
            {/* </div> */}
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
            <h1 className="pageTitle mt-xl-3 mt-5">Penjualan</h1>
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
            // scroll={{ y: 460, x:1000 }}
            // defaultSortOrder= 'descend'
            bordered
            size='small'
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