import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { stagedTimers } from "../../fetchData";

import { useNavigate, Navigate,useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './index.css';
import 'remixicon/fonts/remixicon.css';
import { setCredentials } from '../../features/authSlice';
import { useUserLoginMutation } from '../../services/todoService';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [userLogin, { isLoading,isFetching }] = useUserLoginMutation()
  const location=useLocation()
  useEffect(() => {
    if (isLoading || isFetching) stagedTimers.start();
    else stagedTimers.stop();
    return ()=>{
      stagedTimers.stop();
    }
  }, [isLoading,isFetching,location.pathname]);


  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch()

  const handleUsername = ({ target: { value } }) => {
    setUsername(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const onSubmitSuccess = (data) => {
    console.log(data)
    Cookies.set('jwt_token', data.token, { expires: 5 });
    dispatch(setCredentials({ username: data?.existingUser?.username, role: data?.existingUser?.role }))

    navigate("/todo")
    toast.success("Login Successful")
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      toast.error('Please fill in both fields.');
      return;
    }

    const userDetails = { username, password };
    try {
      const data = await userLogin(userDetails).unwrap();
      onSubmitSuccess(data)
    } catch (error) {
      toast.error(error.data.message)
    }

  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    return <Navigate to="/todo" />;
  }

  const isValid = username && password

  return (
    <div className="login-container">
      <div className="container">
        <img
          className="login-image"
          src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749119001/todo-login-image_lbfx0u.webp"
          alt="login"
        />
      </div>
      <form id="form" className="form-container" onSubmit={handleLogin}>
        <div className="input-wrapper">
          <input
            id="username"
            value={username}
            onChange={handleUsername}
            className="input-element"
            type="text"
            required
          />
          <label htmlFor="username" className="label">
            USERNAME
          </label>
        </div>
        <div className='input-wrapper'>
          <input
            id="password"
            value={password}
            onChange={handlePassword}
            className="input-element"
            type={showPassword ? 'text' : 'password'}
            required
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          {showPassword ? (<i onClick={handleShowPassword} className="ri-eye-line eye"></i>) : (<i onClick={handleShowPassword} className="ri-eye-off-line eye"></i>)}
        </div>

        <button disabled={isLoading || !isValid} type="submit" className="login-button-form">
          {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
            Processing...
            <ClipLoader color="#007bff" size={15} />
          </span>) : ("Login")}
        </button>
        <Link to="/signup" style={{ textDecoration: 'none' }} className='login-text'>
          Not yet signed up? Sign up here
        </Link>
        <Link to="/forgot-password"><button className='login-button-form'>Forgot Password</button></Link>
      </form>
    </div>
  );
};

export default Login;
