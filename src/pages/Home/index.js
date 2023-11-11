import "./style.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Input, Card } from 'antd';
import { Icon } from "@iconify/react";

const Home = () => {
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
                <Link to="/stok/input">
                  <>
                  <Icon icon="gridicons:add" className="icon-dashboard" width={27} color="#FFFFFF"/>
                  <p>Input Stok</p>
                  </>
                </Link>
            </Card>
            <Card className="penjualan">
              <Link to="/penjualan/input">
                <>
                <Icon icon="fa6-solid:rupiah-sign" className="icon-dashboard" width={27} color="#FFFFFF"/> 
                <p>Penjualan</p>
                </>
              </Link>
            </Card>
            <Card className="input-sales">
                <Link to="/stok">
                <>
                <Icon icon="ion:person" className="icon-dashboard" width={27} color="#FFFFFF"/>
                <p>Input Sales</p>
                </>
                </Link>
            </Card>
            
        </div>
      </div>
    </div>
  )
}

export default Home