import "./login.scss";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { Input } from 'antd';

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ;
  const data = {username, password};

  useEffect(() => {
    // if(Cookies.get('user-data')){
    //   navigate('/', { replace: true });
    // }
  }, [])

  function handleLogin() {
    setLoading(true)
    if(!username){
      setLoading(false)
      toast.error("Username tidak boleh kosong")
    }
    else if(!password){
      setLoading(false)
      toast.error("Password tidak boleh kosong")
    }
    else{
      axios.post(`${url}/auth/login`,data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept:'application/json'
        },
      })
      .then(res => {
        if(res.status == 200){
          toast.success('Login Berhasil');
          Cookies.set('token', res.data.access_token)
          Cookies.set('user-data', JSON.stringify(res.data))
          navigate('/', { replace: true });
        }
        else if(res.status == 404){
          toast.error('Invalid username or password')
        }
        else if(res.status == 409){
          toast.error('Conflict with existing account')
        }
      })
      .catch(function (error) {
        setLoading(true);
          if (error.response) {
            toast.error(error.response.data.message)
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
    
  }

  return (
    <div className="login">
        <div className="wrapper">
          <p className="appTitle"><b>Emeste</b> Store System</p>
          <div className="card pt-5 pb-4">
            <p className="loginTitle">Login</p>
            <div className="row justify-content-center">
              <div className="col-md-8 col-10 my-2">
                <Input 
                  className="py-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  // prefix={<UserOutlined className='iconOutline' />} 
                  />
              </div>
              <div className="col-md-8 col-10 my-2">
                <Input.Password 
                  className="py-2"
                  placeholder="Password"
                  value={password}
                  // prefix={<LockOutlined className='iconOutline'/>}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyPress={event => event.key === 'Enter' ? handleLogin : null}
                  ></Input.Password>  
              </div>
            </div>
            
            {
            !loading ? 
              <button className="loginButton my-4" onClick={()=>handleLogin()}>Login</button>
              :
              <div className='spiner'>
                <div className="loading-spinner"></div> <div className='ms-1' 
                  style={{fontFamily:'Inter', color: '#606060'}}>Mohon Tunggu</div>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default Login