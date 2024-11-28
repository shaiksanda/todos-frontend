import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './index.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const navigate = useNavigate();

  const handleCheckbox = () => {
    setShowPassword(!showPassword);
  };

  const handleUsername = ({ target: { value } }) => {
    setUsername(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const onSubmitSuccess = (data) => {
    
    Cookies.set('jwt_token', data.jwtToken,);
    Cookies.set('username',username,{expires: 30});
    

    navigate('/todo');
  };

  const onSubmitFailure = (message) => {
    setErrorMsg(message);
    setShowErrorMsg(true);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      onSubmitFailure('Please fill in both fields.');
      return;
    }

    const userDetails = { username, password };
    const url = 'https://todos-backend-d9im.onrender.com/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data)
      if (response.ok === true) {
        onSubmitSuccess(data);
      } else {
        onSubmitFailure(data.message);
      }
    } catch (error) {
      onSubmitFailure('An error occurred. Please try again later.');
    }
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    return <Navigate to="/todo" />;
  }

  return (
    <div className="login-container">
      <div className="container">
        <img
          className="login-image"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F005%2F879%2F539%2Foriginal%2Fcloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg&f=1&nofb=1&ipt=f4a0b722da0bcc8980f4847046fde79e0a553bb0dcdd64ea970e0ac6623bc09a&ipo=images"
          alt="login"
        />
      </div>
      <form id="form" className="form-element form-container" onSubmit={handleLogin}>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          id="username"
          value={username}
          onChange={handleUsername}
          placeholder="USERNAME"
          className="input-element"
          type="text"
        />
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          id="password"
          value={password}
          onChange={handlePassword}
          placeholder="password"
          className="input-element"
          type={showPassword ? 'text' : 'password'}
        />
        <div className="checkbox-container">
          <input
            checked={showPassword}
            onChange={handleCheckbox}
            id="checkbox"
            type="checkbox"
            className="checkbox"
          />
          <label style={{ cursor: 'pointer' }} htmlFor="checkbox" className="label">
            Show Password
          </label>
        </div>

        <button type="submit" className="login-button-form">
          Login
        </button>
        {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          Not yet signed up? Sign up here
        </Link>
      </form>
    </div>
  );
};

export default Login;
