import "./login.scss";
import illustration from '../../images/parking.png'
import yabisa from '../../images/yabisa.png';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import { Input, Checkbox } from 'antd';

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [isErrorPass, setisErrorPass] = useState('')
  const [isErrorUsername, setisErrorUsername] = useState('')
  const [errorUsername, seterrorUsername] = useState('')
  const [errorPass, seterrorPass] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let url = process.env.REACT_APP_API_URL ;
  const data = { username, password};

  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  useEffect(() => {
    if(Cookies.get('user-data')){
      navigate('/', { replace: true });
    }
  }, [])

  function handleLogin() {
    setLoading(true)
    setisErrorUsername(false)
    setisErrorPass(false)
    if(!username){
      setLoading(false)
      setisErrorUsername(true)
      seterrorUsername("Username tidak boleh kosong")
    }
    else if(!password){
      setLoading(false)
      setisErrorPass(true)
      seterrorPass('Password tidak boleh kosong')
    }
    else{
      setisErrorUsername(false)
      setisErrorPass(false)
      axios.post(`${url}/auth/login`,data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept:'application/json'
        },
      }
      )
      .then(res => {
        if(res.status == 200){
          toast.success('Login Berhasil');
          Cookies.set('token', res.data.data.token)
          Cookies.set('user-data', JSON.stringify(res.data.data))
          navigate(res.data.data.id_dc_group_user == 12 ? '/koordinator-jukir' : 
          res.data.data.id_dc_group_user == 9 ? '/pemakaian-mesin' :
          '/', { replace: true });
        }
        else if(res.status == "Error"){
          toast.error(res.message)
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
          <p className="loginTitle"><b>Emeste</b> Store System</p>
          <div className="card">
            <p className="loginTitle">Login</p>
            <div className="col-8">
              <Input 
                type="email"
                className="text-lg col-8"
                placeholder="youremail@mail.com"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                prefix={<UserOutlined className='iconOutline' />} 
                />
              {/* {
                errorEmail ?  <p className='error pt-2'>Fill Your Email!</p> : <p>{''}</p>
              }
              { errorEmail3 ? <p className='error pt-2'>Invalid Email</p> : <p>{''}</p> }
              {
                errorEmail2 ?  <p className='error'>User Doesn&apos;t Exist!</p> : <p>{''}</p>
              } */}
            </div>
            <div className="col-8 pt-2">
              {/* <div className="d-flex flex-row"> */}
              <Input.Password 
                className="text-lg"
                placeholder="Password"
                value={password}
                prefix={<LockOutlined className='iconOutline'/>}
                onChange={(event) => setPassword(event.target.value)}
                // onKeyPress={event => event.key === 'Enter' ? onSubmit() : null}
                ></Input.Password>
              {/* </div> */}
              {/* {
                errorPass ? <p className='error pt-2'>Fill Your Password!</p> : <p>{''}</p>
              }   
              {
                errorPass2 ? <p className='error'>Wrong Password!</p> : <p>{''}</p>
              }         */}
            </div>
            
            {
            !loading ? 
              <button className="loginButton" onClick={()=>handleLogin()}>Login</button>
              :
              <div className='spiner'>
                <div className="loading-spinner"></div> <div className='ms-3'>Please Wait</div>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default Login