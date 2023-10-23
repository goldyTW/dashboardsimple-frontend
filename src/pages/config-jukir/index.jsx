import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar'
import "./config-jukir.scss"
// import { userColumnsConfigJukir } from "../../jukir_data";
// import Modals from '../../components/modal-jukir';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Table } from 'antd';
// import ExcelExport from '../ExportExcel/Excelexport';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function KonfigurasiJukir() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [dataJukir, setDataJukir] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [userID, setuserID] = useState();
  const [nama, setnama] = useState();
  const [emp_cd, setemp_cd] = useState();
  const [koordinator, setkoordinator] = useState();
  const [lokasi, setlokasi] = useState();
  const [noProvider, setnoProvider] = useState();
  const [status, setstatus] = useState();
  const [device, setdevice] = useState();
  const [target, settarget] = useState();
  const [password, setPassword] = useState();
  const [username, setusername] = useState();
  const [noKartuElektronik, setnoKartuElektronik] = useState();
  const [MID, setMID] = useState();
  const [TID, setTID] = useState();
  const [reference, setreference] = useState();
  const [today, setToday] = useState(new Date()); // Save the current date to be able to trigger an update
  const tgl = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}\n\n`;
  const [date, setDate] = useState(tgl);
  const [loading, setLoading] = useState(false);
  let url = process.env.REACT_APP_API_URL ;
  let url2 = process.env.REACT_APP_API_URL_NEW;
  const navigate = useNavigate();

  useEffect(() => {
    if(!Cookies.get('user-data')){
      navigate('/login', { replace: true });
    }
    else{
      setLoading(true)
    //   axios.get(`${url}/master/employee/data?type_employee=1`,{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer '+Cookies.get('token') ,
    //     },
    //   })
    //   .then(res => {
    //       setLoading(false)
    //       setDataJukir(res.data.data)
    //     })
    // }
    axios.get(`${url2}/merchant`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+Cookies.get('token') ,
      },
    })
    .then(res => {
        setLoading(false)
        setDataJukir(res.data.data)
      })
  }
  }, [])
  
  const handleDelete = (id) => {
    axios.delete(`${url}/merchant/delete/`+id,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+Cookies.get('token') ,
      },
    })
    .then(res => {
      if(res.status=200){
        toast.success('Berhasil Menghapus Data')
        window.location.reload()
      }
    })
  };

  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleOpen(param, data) {
    if(param == 'edit'){
      setuserID(data.id_merchant);
      setnama(data.meerchant_name);
      setemp_cd(data.username);
      setkoordinator(data.id_koordinator);
      setlokasi(data.id_location)
      setnoProvider(data.no_hp);
      setstatus(data.employee_status);
      setdevice(data.sn_device);
      setPassword(data.password);
      setusername(data.username);
      settarget(data.target)
      setisEdit(true)
    }
    else{
      setuserID('');
      setnama('');
      setemp_cd('');
      setkoordinator('');
      setlokasi('')
      setnoProvider('');
      setstatus('');
      setdevice('');
      setisEdit(false);
      setPassword('');
      setusername('')
      settarget('')
    }
    setOpen(true)
  } 

  const userColumnsConfigJukir= [
    { dataIndex: "no", 
      title: "No", 
      align:'center',
      width: 55,
      render: ((value, item, index) => index += 1)
    },
    {
      dataIndex: "username",
      title: "User ID Jukir",
      align:'center',
      width: 100,
      sorter: {
        compare: (a, b) => {return a.username.localeCompare(b.username)},
        multiple: 2,
      },
      sortDirections: ['ascend', 'descend'],
      // render: (_, record) => (
      //   <Link to={'/jukir-detail/'+record.emp_cd}>
      //     {record.emp_cd}
      //   </Link>
      // )
    },
    {
      dataIndex: "merchant_name",
      title: "Nama",
      align:'center',
      width:100,
      sorter: {
        compare: (a, b) => {return a.merchant_name.localeCompare(b.merchant_name)},
        multiple: 3,
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      dataIndex: "sn_device",
      title: "Device UID (SN)",
      align:'center',
      width: 125,
      // sorter: (a, b) => {return a.device_sn.localeCompare(b.device_sn)},
      sortDirections: ['ascend', 'descend'],
    },
    {
      dataIndex: "location_name",
      title: "Lokasi",
      align:'center',
      width: 150,
      sorter: {
        compare: (a, b) => {return a.location_name.localeCompare(b.location_name)},
        multiple: 4,
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      dataIndex: "no_provider",
      title: "No Provider",
      align:'center',
      width: 120,
    },
    {
      dataIndex: "isON",
      title: "Status",
      align:'center',
      width: 80,
      sorter: {
        compare: (a, b) => a.isON - b.isON,
        multiple: 1,
      },
      sortDirections: ['ascend', 'descend'],
      render: ((params) => (
        <div style={{color: params == 1 ? 'rgba(72, 195, 81, 0.87)' : 'red', alignSelf:'center'}}>
          <span style={{marginLeft:'5px'}}>{params == 1 ? 'Active' : "Inactive"}</span>
        </div>
      ))
    },
    {
      field: "action",
      title: "Action",
      width: 120,
      align:'center',
      render: (_, record) => {
        return (
          <div className="cellAction">
            <div className="editButton" onClick={() => handleOpen('edit', record)}>Edit</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(record.id_merchant)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
    <div className="list">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="listContainer" style={{display:sidebarOpen ? 'none' : ''}}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='date'>
          <div className='left'>
            <h1>Juru Parkir</h1>
            <a className="addConfigButton" onClick={handleOpen}>
            {/* <AddCircleIcon className="addIcon"/> */}
            Tambah Jukir</a>
          </div>
          <div className='right'>
          {/* <ExcelExport excelData={dataJukir} fileName={'Data Jukir per'+date}></ExcelExport> */}
          </div>
        </div>
        {
           !loading ? 
        <Table
            columns={userColumnsConfigJukir}
            dataSource={dataJukir}
            pagination={false}
            scroll={{ y: 460 }}
            size='small'
            className="tableDailyJukir"
            rowClassName={'tableDailyJukir'}
            defaultSortOrder
            bordered
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
    {/* <Modals handleClose={handleClose} isEdit={isEdit} open={open} nama={nama} userID={userID} koordinator={koordinator} lokasi={lokasi} noProvider={noProvider} status={status} device={device}
      setuserID={setuserID} setnama={setnama} setkoordinator={setkoordinator} setlokasi={setlokasi} setnoProvider={setnoProvider}
      setstatus={setstatus} setdevice={setdevice} target={target} settarget={settarget} noKartuElektronik={noKartuElektronik} setnoKartuElektronik={setnoKartuElektronik}
      MID={MID} setMID={setMID} TID={TID} setTID={setTID} password={password} setPassword={setPassword} emp_cd={emp_cd} setemp_cd={setemp_cd}
      url={url} reference={reference} setreference={setreference} username={username} setusername={setusername}></Modals> */}
    </>
  )
}

export default KonfigurasiJukir;