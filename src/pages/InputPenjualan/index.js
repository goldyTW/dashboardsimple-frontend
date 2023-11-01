import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { Input, Select, Table } from 'antd';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import { Icon } from "@iconify/react";
import { render } from "@testing-library/react";

const InputPenjualan = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ;

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

  useEffect(() => {
    // if(!Cookies.get('user-data')){
    //   navigate('/login', { replace: true });
    // }
  }, [])

  function saveData(){
    axios.post(`${url}/master/employee/store`, { username, password, target, sn_device:device,
      EMP_CD:emp_cd, EMP_NM:nama, ID_MT_LOCATION: lokasi, ID_MT_COMPANY:1, NO_HP: noProvider, EMPLOYEE_STATUS:status, TYPE_EMPLOYEE:1
    }, { 
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+Cookies.get('token'),
      },})
    .then(res => {
      setLoading(false)
      if(res.status = 200){
        setuserID('')
        // setkoordinator('')
        setlokasi('')
        setemp_cd('')
        setnama('')
        setdevice('')
        setnoProvider('')
        setstatus('')
        setTID('')
        setMID('')
        settarget('')
        setnoKartuElektronik('')
        setreference('')
        handleClose()
        toast.success('Tambah Data Berhasil!')
        window.location.reload()
      }
      }).catch(function (error) {
        if (error.response) {
          toast.error("Tolong Coba Lagi")
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setLoading(false);
        } else if (error.request) {
          console.log(error.request);
          setLoading(false);
        } else {
          console.log('Error', error.message);
          setLoading(false);
    }})
  }

  // const columnPenjualan= [
  //   { dataIndex: "No", 
  //     title: "No", 
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 50,
  //     render: ((value, item, index) => index += 1)
  //   },
  //   {
  //     dataIndex: "nama_barang",
  //     title: "Nama Barang",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 150,
  //     sorter: (a, b) => {return a.nama_barang.localeCompare(b.nama_barang)},
  //   },
  //   {
  //     dataIndex: "waktu_penjualan",
  //     title: "Tanggal Penjualan",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 100,
  //     sorter:(a,b) => a.waktu_penjualan - b.waktu_penjualan,
  //     render: ((_, record) => ( moment(record.waktu_penjualan).format('DD-MM-YY') ))
  //   },
  //   {
  //     dataIndex: "waktu_pengiriman",
  //     title: "Tanggal Pengiriman",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 100,
  //     sorter:(a,b) => a.waktu_pengiriman - b.waktu_pengiriman,
  //     render: ((_, record) => ( moment(record.waktu_pengiriman).format('DD-MM-YY') ))
  //   },
  //   {
  //     dataIndex: "jumlah",
  //     title: "Jumlah",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 100,
  //     sorter: (a, b) => a.jumlah - b.jumlah,
  //     render:((_, record) => (record.jumlah).toLocaleString('id'))
  //   },
  //   {
  //     dataIndex: "customer",
  //     title: "Customer",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 90,
  //     // sorter: (a, b) => {return a.customer.localeCompare(b.customer)},
  //   },
  //   {
  //     dataIndex: "alamat",
  //     title: "Alamat Kirim",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 200,
  //   },
  //   {
  //     dataIndex: "tempo",
  //     title: "Tempo",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 70,
  //   },
  //   {
  //     dataIndex: "status_kirim",
  //     title: "Status Kirim",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 100,
  //     sorter: (a, b) => {return a.status_kirim.localeCompare(b.status_kirim)},
  //     render: ((_, record) => (
  //         <span style={{color: (record.status_kirim == "PENDING" ? '#F2A40D' : '#60D19BAB' )}}>{record.status_kirim}</span>
  //     ))
  //   },
  //   {
  //     dataIndex: "sales",
  //     title: "Sales",
  //     sortDirections: ['ascend', 'descend'],
  //     align:'center',
  //     width: 100,
  //   },
  //   {
  //     field: "action",
  //     title: "Action",
  //     width: 80,
  //     align:'center',
  //     render: (_, record) => {
  //       return (
  //         <div className="cellAction">
  //           {/* <div className="editButton"> */}
  //           <Icon onClick={() => handleOpen('edit', record)} icon="heroicons:pencil-solid" 
  //             className='me-1' color="#0A6294" style={{cursor:'pointer'}} width={18}/> 
  //           {/* </div> */}
  //           {/* <div className="deleteButton"> */}
  //             <Icon onClick={() => handlePrint(record.id_device)} icon="ph:printer-fill" 
  //             className='ms-1' color="#B81212" style={{cursor:'pointer'}} width={18}/> 
  //           {/* </div> */}
  //         </div>
  //       );
  //     },
  //   },
  // ];

  return (
    <div className="main">
      <div className={sidebarOpen ? "mainSideLayoutFull" : "mainSideLayoutNotFull" }>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      </div>
      <div className={sidebarOpen ? "mainNavLayoutNotFull" : "mainNavLayoutFull" }>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="row pt-xl-2"> 
          <div className="col-12 col-md-6 align-self-center">     
            <h1 className="pageTitle mt-xl-3 mt-5">Input Penjualan</h1>
          </div>  
        </div>
        
        <div className='rowJukir p-3'>
          <div className='col-a'>
            <div className='rows'>
              <div className='col-1'>
                Username
              </div>
              <div className='col-2'>
                <Input label="Username" value={username} onChange={(e) => setusername(e.target.value)}/> 
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                Password
              </div>
              <div className='col-2'>
                <Input type='password' disabled={isEdit ? true : false} label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                Nama
              </div>
              <div className='col-2'>
                <Input label="Nama" value={nama} onChange={(e) => setnama(e.target.value)}/> 
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                User ID Jukir
              </div>
              <div className='col-2'>
                <Input label="emp_cd" value={emp_cd} onChange={(e) => setemp_cd(e.target.value)}/> 
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                Lokasi
              </div>
              <div className='col-2'>
              {/* <Input label="Lokasi" value={lokasi} onChange={(e) => setlokasi(e.target.value)}/>  */}
              <Select
                placeholder=""
                getPopupContainer={(triggerNode) => {
                  return triggerNode.parentNode;
                }}
                style={{width:'100%'}}
                onChange={(e) => setlokasi(e)}
                defaultValue={lokasi}
                options={[]}
              />
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                Target
              </div>
              <div className='col-2'>
                <Input label="Target" type='number' value={target} onChange={(e) => settarget(e.target.value)}/>
              </div>
            </div> 
            <div className='rows'>
              <div className='col-1'>
                No. Provider
              </div>
              <div className='col-2'>
                <Input label="No. Provider" value={noProvider} onChange={(e) => setnoProvider(e.target.value)}/> 
              </div>
            </div>
          </div>
          <div className='col-b'>
            <div className='rows'>
              <div className='col-1'>
                No. Kartu Elektronik
              </div>
              <div className='col-2'>
                <Input label="No. Kartu Elektronik" value={noKartuElektronik} onChange={(e) => setnoKartuElektronik(e.target.value)}/> 
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                MID Mesin EDC
              </div>
              <div className='col-2'>
              <Input label="MID" value={MID} onChange={(e) => setMID(e.target.value)} /> 
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                TID Mesin EDC
              </div>
              <div className='col-2'>
                <Input label="TID" value={TID} onChange={(e) => setTID(e.target.value)}/>
              </div>
            </div> 
            <div className='rows'>
              <div className='col-1'>
              Device UID
              </div>
              <div className='col-2'>
                <Input label="device" value={device} onChange={(e) => setdevice(e.target.value)}/>
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
              Reference Code
              </div>
              <div className='col-2'>
                <Input label="Reference Code" value={reference} onChange={(e) => setreference(e.target.value)}/>
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                Status
              </div>
              <div className='col-2'>
              <Select
                placeholder="status"
                getPopupContainer={(triggerNode) => {
                  return triggerNode.parentNode;
                }}
                style={{width:'100%'}}
                onChange={(e) => setstatus(e)}
                defaultValue={status == 1 ? "Active" : "Inactive"}
                options={[
                  {
                    value: 1,
                    label: 'Active',
                  },
                  {
                    value: 0,
                    label: 'Inactive',
                  }
                ]}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputPenjualan