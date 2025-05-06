import { useState ,} from 'react';

import { useNavigate,Navigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './index.css';
import 'remixicon/fonts/remixicon.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [loading,setLoading]=useState(false)
  const [showSuccessMsg,setShowSuccessMsg]=useState(false)
  const [successMsg,setSuccessMsg]=useState("")

  const navigate = useNavigate();
  if (showErrorMsg) {
    setTimeout(() => {
      setShowErrorMsg(false);
      setErrorMsg('');
    }, 5000)
  }
  if (showSuccessMsg) {
    setTimeout(() => {
      navigate("/todo");
    }, 1500);
    
  }
  

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsername = ({ target: { value } }) => {
    setUsername(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const onSubmitSuccess = (data) => {

    Cookies.set('jwt_token', data.jwtToken, { expires: 5 });
    Cookies.set('username', username, { expires: 5 });


    //here popup needs to be shown
    setShowSuccessMsg(true)
    setSuccessMsg(data.message)

    setTimeout(()=>{
      navigate('/todo');
    },1500)
  };

  const onSubmitFailure = (message) => {
    setErrorMsg(message);
    setShowErrorMsg(true);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true)

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
      setLoading(false)
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

  const isValid=username && password

  return (
    <div className="login-container">
      <div className="container">
        <img
          className="login-image"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F005%2F879%2F539%2Foriginal%2Fcloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg&f=1&nofb=1&ipt=f4a0b722da0bcc8980f4847046fde79e0a553bb0dcdd64ea970e0ac6623bc09a&ipo=images"
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
        {/* <div className="checkbox-container">
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
        </div> */}
        

        <button disabled={loading || !isValid} type="submit" className="login-button-form">
        {loading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px",justifyContent:"center" }}>
                    Processing...
                    <ClipLoader color="#007bff" size={15} />
                </span>) : ("Login")}
        </button>
        {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        {showSuccessMsg && <p className='success-msg'>✅{successMsg} And Redirected To Home Page</p>}
        <Link to="/signup" style={{ textDecoration: 'none' }} className='login-text'>
          Not yet signed up? Sign up here
        </Link>
        <Link to="/forgot-password"><button className='login-button-form'>Forgot Password</button></Link>
      </form>
    </div>
  );
};

export default Login;
