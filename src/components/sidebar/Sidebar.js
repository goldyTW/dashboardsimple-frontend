import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  const location = useLocation();
  const last = location.pathname.split("/")
  const active =  last[1];
  const [user_type, setuser_type] = useState()
  const [userName, setUserName] = useState('');
  const [profileImg, setprofileImg] = useState("https://picsum.photos/id/29/200");
  const navigate = useNavigate();

  useEffect(() => {
    if(Cookies.get('user-data')){
      let user = JSON.parse(Cookies.get('user-data'));
      setUserName(user.username)
      setuser_type(user.role)
    }
  }, []);

  function handleLogout(){
        localStorage.clear();
        Cookies.remove('token');
        Cookies.remove('user-data')
        navigate('/login', { replace: true });
  }

  return (
    <div className='sidebar p-3'>
      <div className="xbutton">
        <Icon icon="material-symbols:close-rounded" className='iconBurger' style={{cursor:'pointer'}} width={26} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      <div className="burgerbutton">
        <Icon icon="charm:menu-hamburger" className='iconBurger' width={24} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      <img
        src={profileImg}
        alt={userName}
        className={sidebarOpen ? "avatar mt-5" : "avatarSmall mt-5"}
      />
      <div className="nameDisplay mt-2 mb-1">{sidebarOpen ? userName : userName.split('')[0 ]}</div>
      <div className="roleDisplay mt-1 mb-4">{user_type}</div>
      <a className="logoutBtn px-3 py-2 mt-4" onClick={()=>handleLogout()}>
        <Icon icon="quill:off" className='align-self-center mx-1' width={18}/>
          {sidebarOpen ? 'Sign Out' : ''}
      </a>
    
      <div className="mt-5 menu">
      {/* style={{display:!sidebarOpen ? 'none' : ''}} */}
        {
          // user_type != 'admin' &&
          <>
          <Link to="/">
          <div className={active == "" ? "menuItem active" : 'menuItem'}>
            <div className="d-flex justify-content-center">
              <div className="me-1">
                <Icon icon="ic:round-dashboard" className='' width={18}/> 
              </div>
              <div className="me-1" style={{display:!sidebarOpen ? 'none' : ''}}>
                Dashboard
              </div>
            </div>
          </div>
          </Link>

          <Link to="/stok">
          <div className={active == "stok" ? "menuItem active" : 'menuItem'}>
            <div className="d-flex justify-content-center">
              <div className="me-1">
                <Icon icon="ic:baseline-inventory" className='' width={18}/>
              </div>
              <div className="me-1" style={{display:!sidebarOpen ? 'none' : ''}}>Stok</div>
            </div>
          </div>
          </Link>

          <Link to="/penjualan">
          <div className={active == "penjualan" ? "menuItem active" : 'menuItem'}>
            <div className="d-flex justify-content-center">
              <div className="me-1">
              <Icon icon="ic:baseline-sell" className='' width={18}/>
              </div>
              <div className="me-1" style={{display:!sidebarOpen ? 'none' : ''}}>Penjualan</div>
            </div>
          </div>
          </Link>
          </>
        }
      </div>
    </div>
  );
};

export default Sidebar;
