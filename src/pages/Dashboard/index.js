import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { Input, Card } from 'antd';
import { Icon } from "@iconify/react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ;

  useEffect(() => {
    // if(!Cookies.get('user-data')){
    //   navigate('/login', { replace: true });
    // }
  }, [])


  return (
    <div className="main">
      <div className={sidebarOpen ? "mainSideLayoutFull" : "mainSideLayoutNotFull" }>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      </div>
      <div className={sidebarOpen ? "mainNavLayoutNotFull" : "mainNavLayoutFull" }>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="dashboard">
            <Card className="input-stok">
                <Icon icon="gridicons:add" className="icon-dashboard" width={27} color="#FFFFFF"/>
                <p>Input Stok</p>
            </Card>
            <Card className="penjualan">
                <Icon icon="fa6-solid:rupiah-sign" className="icon-dashboard" width={27} color="#FFFFFF"/> 
                <p>Penjualan</p>
            </Card>
            <Card className="input-sales">
                <Icon icon="ion:person" className="icon-dashboard" width={27} color="#FFFFFF"/>
                <p>Input Sales</p>
            </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard