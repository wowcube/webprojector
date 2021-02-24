import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import loginLogo from '../assets/images/wowcube-logo.png'
import { LOGIN_SET_USER_DATA } from '../actions/login';
import { loginApi } from '../api/login';

const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const stateUserData = useSelector(state => state.auth);

  const handleChange = (event, key) => {
    setFormData(prev => ({...prev, [key]: event.target.value }))
  }

  const handleLogin = () => {
    if (!!formData.username && !!formData.password) {
      loginApi(formData).then(response => {
        dispatch(LOGIN_SET_USER_DATA(response.data));
        localStorage.access = response.data.access
        window.location.reload();
      })
    } else {
      console.error('empty inputs')
    }
  }


  return (
    <div className="wrapper">
      <div className="authentication-forgot d-flex align-items-center justify-content-center">
        <div className="card shadow-lg forgot-box">
          <div className="card-body p-md-5">
            <div className="text-center">
              <img src={loginLogo} width="140" alt="" />
            </div>
            <div className="form-group mt-5">
              <label>Login</label>
              <input type="text" className="form-control form-control-lg radius-30" onChange={(event)=> handleChange(event, 'username')}  placeholder="Login" />
            </div>
            <div className="form-group mt-2">		
              <label>Password</label>
              <input type="password" className="form-control form-control-lg radius-30" onChange={(event)=> handleChange(event, 'password')} placeholder="password" />
            </div>
            <button type="button" className="btn btn-light btn-lg btn-block radius-30 mt-5" onClick={handleLogin}>Sign In</button> <a href="authentication-login.html" className="btn btn-link btn-block"><i className='bx bx-arrow-back mr-1'></i>Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login