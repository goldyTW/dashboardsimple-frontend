import "./navbar.scss";
import { useContext, useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import Cookies from 'js-cookie';
import axios from "axios";
import moment from "moment";
require('moment/locale/id'); // Import Indonesian locale data

const Navbar = ({setSidebarOpen, sidebarOpen}) => {
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update
  let url = process.env.REACT_APP_API_URL ;
  
  useEffect(() => {
    if(Cookies.get('user-data')){
      let user = JSON.parse(Cookies.get('user-data'));
    }
  }, []);

  return (
    <div className="navbar row p-xl-3 p-2">
        <div className="col-md-6 col-12">
        <Icon icon="charm:menu-hamburger" className='iconBurger' width={24} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <span className="navTitle">
            <b>Emeste</b> Store System</span>
        </div>
        <div className="col-md-6 text-end month">
          <span className="navTitle">{(moment(today).format('dddd, DD MMMM YYYY')).toLocaleString('id')}</span>
        </div>
    </div>
  );
};

export default Navbar;
