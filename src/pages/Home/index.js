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
import HomeCard from "../../components/Cards/HomeCard";
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if(!Cookies.get('user-data')){
      navigate('/login', { replace: true });
    }
  }, [])


  return (
    <div className="main">
      <div className={sidebarOpen ? "mainSideLayoutFull" : "mainSideLayoutNotFull"}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      </div>
      <div className={sidebarOpen ? "mainNavLayoutNotFull" : "mainNavLayoutFull"}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="dashboard">
            <Col>
              <HomeCard
                link="/stok/input"
                content="Input Stok"
                bgColor="rgba(96, 209, 155, 0.67)"
                icon="gridicons:add"
                iconColor="#FFFFFF"
                iconWidth="25"
              />
            </Col>
            <Col>
              <HomeCard
                link="/penjualan/input"
                content="Penjualan"
                bgColor="rgba(251, 202, 75, 1)"
                icon="fa6-solid:rupiah-sign"
                iconColor="#FFFFFF"
                iconWidth="25"
              />
            </Col>
            <Col>
              <HomeCard
                link="/stok"
                content="Input Sales"
                bgColor="rgba(184, 18, 18, 0.62)"
                icon="ion:person"
                iconColor="#FFFFFF"
                iconWidth="25"
              />
            </Col>
        </div>
      </div>
    </div>
  )
}

export default Home