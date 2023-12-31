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

const Stok = () => {
  const location = useLocation();
  const last = location.pathname.split("/")
  const active = last[1];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ;

  const stok = [
    {
      nama_barang:'kain pramuka',
      harga_beli:20_000,
      harga_jual:25_000,
      jumlah:220,
      batas_stok:100,
      waktu_masuk:'12-10-23', //MM DD YY
      supplier:'Exatex'
    }
  ]

  useEffect(() => {
    // if(!Cookies.get('user-data')){
    //   navigate('/login', { replace: true });
    // }
  }, [])

  function handlePrint(id){
    
  }
  function handleOpen(opt, record){
    
  }

  const columnStok= [
    { dataIndex: "No", 
      title: "No", 
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 50,
      render: ((value, item, index) => index += 1)
    },
    {
      dataIndex: "nama_barang",
      title: "Nama",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 150,
      sorter: (a, b) => {return a.nama_barang.localeCompare(b.nama_barang)},
    },
    {
      dataIndex: "harga_beli",
      title: "Harga Beli/yard",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter:(a,b) => a.harga_beli - b.harga_beli,
      render: ((_, record) =>(record.harga_beli).toLocaleString('id') )
    },
    {
      dataIndex: "harga_jual",
      title: "Harga Jual/yard",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter:(a,b) => a.harga_jual - b.harga_jual,
      render: ((_, record) => (record.harga_jual).toLocaleString('id') )
    },
    {
      dataIndex: "jumlah",
      title: "Jumlah",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter:(a,b) => a.jumlah - b.jumlah,
      render: ((_, record) => (record.jumlah).toLocaleString('id') )
    },
    {
      dataIndex: "batas_stok",
      title: "Batas Stok",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter:(a,b) => a.batas_stok - b.batas_stok,
      render: ((_, record) => (record.batas_stok).toLocaleString('id') )
    },
    {
      dataIndex: "waktu_masuk",
      title: "Tanggal Masuk",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter:(a,b) => a.waktu_masuk - b.waktu_masuk,
      render: ((_, record) => (record.waktu_masuk).toLocaleString('id') )
    },
    {
      dataIndex: "supplier",
      title: "Supplier",
      sortDirections: ['ascend', 'descend'],
      align:'center',
      width: 100,
      sorter: (a, b) => a.supplier - b.supplier,
      render:((_, record) => (record.supplier).toLocaleString('id'))
    }
    // {
    //   field: "action",
    //   title: "Action",
    //   width: 80,
    //   align:'center',
    //   render: (_, record) => {
    //     return (
    //       <div className="cellAction">
    //         {/* <div className="editButton"> */}
    //         <Icon onClick={() => handleOpen('edit', record)} icon="heroicons:pencil-solid" 
    //           className='me-1' color="#0A6294" style={{cursor:'pointer'}} width={18}/> 
    //         {/* </div> */}
    //         {/* <div className="deleteButton"> */}
    //           <Icon onClick={() => handlePrint(record.id_device)} icon="ph:printer-fill" 
    //           className='ms-1' color="#B81212" style={{cursor:'pointer'}} width={18}/> 
    //         {/* </div> */}
    //       </div>
    //     );
    //   },
    // },
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
            <h1 className="pageTitle mt-xl-3 mt-5"><b>Stok</b></h1>
          </div>  
          <div className="col-12 col-md-6 text-end pt-xl-2">  
            <Link to={"/stok/input"}> 
              <button className="tambahButton my-4 align-self-center">
              <Icon icon="gridicons:add" className='me-1' width={20}/>
                Tambah Stok</button>
            </Link>
          </div>
        {
           !loading ? 
           <Table
            columns={columnStok}
            dataSource={stok}
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

export default Stok