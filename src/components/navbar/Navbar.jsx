import "./navbar.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Cookies from 'js-cookie';
import axios from "axios";

const Navbar = ({setSidebarOpen, sidebarOpen}) => {
  const locale = 'id';
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [profileImg, setprofileImg] = useState("https://picsum.photos/id/29/200");
  let url = process.env.REACT_APP_API_URL ;
  
  useEffect(() => {
    if(Cookies.get('user-data')){
      let user = JSON.parse(Cookies.get('user-data'));
      setUserName(user.username)
    }

    const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 1 * 1000);

    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    } 
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });

  function handleLogout(){
    // axios.post(`${url}/auth/logout`,{
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept:'application/json',
    //     Authorization: 'Bearer '+Cookies.get('token') ,
    //   },
    // })
    // .then(res => {
    //   console.log(res)
    //   if(res.status == 200){
        localStorage.clear();
        Cookies.remove('token');
        Cookies.remove('user-data')
        navigate('/login', { replace: true });
    //   }
    // })
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <Icon icon="charm:menu-hamburger" className='iconBurger' style={{marginRight:'10px', cursor:'pointer'}} width={26} 
          // onClick={() => dispatch({ type: "TOGGLE" })}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <div className="items">
          {/* <div className="item">
          <Icon icon="material-symbols:dark-mode-outline" className='icon' width={26} style={{marginRight:'20px'}}
          onClick={() => dispatch({ type: "TOGGLE" })}/>
          </div> */}
          <div className="item2">
              <p className="nameDisplay">{userName}</p>
              <a className="logoutBtn" onClick={()=>handleLogout()}><Icon icon="material-symbols:logout" className='align-self-center ms-2' width={20}/>Logout</a>
          </div>
          <div className="item">
            <img
              src={profileImg}
              alt={userName}
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
