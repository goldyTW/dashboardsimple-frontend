import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import yabisa from '../../images/yabisa.png'
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  const location = useLocation();
  const last = location.pathname.split("/")
  const active =  last[1];
  const [user_type, setuser_type] = useState()

  useEffect(() => {
    if(Cookies.get('user-data')){
      let user = JSON.parse(Cookies.get('user-data'));
      setuser_type(user.id_dc_group_user)
    }
  }, []);

  return (
    <div className='sidebar' 
    style={{display: sidebarOpen ? "block" : ''}}
    >
      <div className="top">
        {/* <Link to="/" style={{ textDecoration: "none" }}> */}
          <img className="logo" src={yabisa} alt="yabisa"></img>
        {/* </Link> */}
        <div className="xbutton">
          <Icon icon="material-symbols:close-rounded" className='iconBurger' style={{marginRight:'10px', cursor:'pointer'}} width={26} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </div>
      <div className="center">
        <ul>
          {
            (user_type != 12 && user_type != 9 && user_type != 2) &&
            <Link to="/" style={{ textDecoration: "none" }}>
            <li className={active == "" ? "active" : ''}>
              <span>Dashboard</span>
            </li>
            </Link>
          }
          {
          (user_type == 1 || user_type == 15 || user_type == 5 || user_type == 6 || user_type == 11) &&
          <>
          <p className="title">Monitoring</p>
          <Link to="/jukir-hourly" style={{ textDecoration: "none" }}>
            <li className={active == "jukir-hourly" ? "active" : ''}>
              <span>Jukir Hourly</span>
            </li>
          </Link>
          <Link to="/jukir-daily" style={{ textDecoration: "none" }}>
            <li className={active == "jukir-daily" ? "active" : ''}>
              <span>Jukir Daily</span>
            </li>
          </Link>
          <Link to="/map" style={{ textDecoration: "none" }}>
          <li className={active == "map" ? "active" : ''}>
            <span>Map</span>
          </li>
          </Link>
          </>
          }
          {
            user_type == 1 && 
            <>
            <p className="title">Report</p>         
            <Link to="/financial-report" style={{ textDecoration: "none" }}>
            <li className={active == "financial-report" ? "active" : ''}>
              <span>Detail Transaksi</span>
            </li>
            </Link>
            </>
          }
          {
            (user_type == 1 || user_type == 15 || user_type == 9) &&
            <>
            <Link to="/pemakaian-mesin" style={{ textDecoration: "none" }}>
              <li className={active == "pemakaian-mesin" ? "active" : ''}>
                <span>Pemakaian Mesin</span>
              </li>
            </Link>
            <Link to="/payment-plan" style={{ textDecoration: "none" }}>
              <li className={active == "payment-plan" ? "active" : ''}>
                <span>Payment Plan</span>
              </li>
            </Link>
            {
            user_type != 9 &&
              <>
              {/* <Link to="/target-vs-actual" style={{ textDecoration: "none" }}>
              <li className={active == "target-vs-actual" ? "active" : ''}>
                <span>Target vs Actual</span>
              </li>
              </Link> */}
              <Link to="/pku-vs-svt" style={{ textDecoration: "none" }}>
              <li className={active == "pku-vs-svt" ? "active" : ''}>
                <span>PKU vs SVT</span>
              </li>
              </Link>
              <Link to="/rekonsiliasi" style={{ textDecoration: "none" }}>
              <li className={active == "rekonsiliasi" ? "active" : ''}>
                <span>Rekonsiliasi</span>
              </li>
              </Link>
              </>
            }
           
            {user_type != 9 &&
              <>
              <p className="title">Configuration</p>
              {/* <Link to="/config-tarif" style={{ textDecoration: "none" }}>
              <li className={active == "config-tarif" ? "active" : ''}>
                <span>Tarif Parkir</span>
              </li>
              </Link> */}
              <Link to="/config-jukir" style={{ textDecoration: "none" }}>
              <li className={active == "config-jukir" ? "active" : ''}>
                <span>Jukir</span>
              </li>
              </Link>
              <Link to="/config-lokasi" style={{ textDecoration: "none" }}>
              <li className={active == "config-lokasi" ? "active" : ''}>
                <span>Lokasi</span>
              </li>
              </Link>
              <Link to="/config-edc" style={{ textDecoration: "none" }}>
              <li className={active == "config-edc" ? "active" : ''}>
                <span>EDC</span>
              </li>
              </Link>
              </>
            }
            </>
          }
          {(user_type == 12) &&
           
              <>
              <Link to="/koordinator-jukir" style={{ textDecoration: "none" }}>
              <li className={active == "koordinator-jukir" ? "active" : ''}>
                <span>Laporan</span>
              </li>
              </Link>

              <Link to="/detail-transaksi-jukir" style={{ textDecoration: "none" }}>
              <li className={active == "detail-transaksi-jukir" ? "active" : ''}>
                <span>Detail Transaksi</span>
              </li>
              </Link>
              </>
              }
          {/* <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
