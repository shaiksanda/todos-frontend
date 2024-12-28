// import { Link } from "react-router-dom"
import { useState } from "react"


import { useNavigate } from 'react-router-dom';
import "./index.css"

const ForgotPassword = () => {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [errorMsg,setErrorMsg]=useState("")
    const [showErrorMsg,setShowErrorMsg]=useState(false)
    const [showPassword,setShowPassword]=useState(false)

    const navigate = useNavigate();

    if (showErrorMsg) {
        setTimeout(()=>{
          setShowErrorMsg(false);
          setErrorMsg('');
        },5000)
      }

    const handleCheckbox=()=>{
        setShowPassword(!showPassword)
    }

    const handleUsername=(event)=>{
        setUsername(event.target.value)
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }

    const onSubmitSuccess=()=>{
        navigate('/login')
    }

    const handleForm=async (event)=>{
        event.preventDefault();
        if (!username || !password) {
            setErrorMsg('Please fill in both fields.');
            setShowErrorMsg(true)
            return;
          }
        const userDetails={username,password}
        const url="https://todos-backend-d9im.onrender.com/forgotPassword"
        const options={
            method:"POST",
            headers:{
            'Content-Type': 'application/json'

            },
            body: JSON.stringify(userDetails)
        }
       try{
        const response=await fetch(url, options)
        const data=await response.json()
        if(response.ok){
            onSubmitSuccess()
        }
        else{
            setErrorMsg(data.message)
            setShowErrorMsg(true)
        }
       }
       catch(error){
            setErrorMsg("An error occurred while resetting your password. Please try again.")
            setShowErrorMsg(true)
       }

    }
    return (
        <div className="login-container">
            <div className="container">
                <img
                    className="login-image"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F174%2F758%2Fnon_2x%2Fforgot-password-landing-page-template-vector.jpg&f=1&nofb=1&ipt=e7ee9149cc0356c966298c2b0b48340f99fdf870dd86235ff7e7c15a6c361784&ipo=images"
                    alt="login"
                    style={{borderRadius:'10px'}}
                />
            </div>
            <form onSubmit={handleForm} id="form" className="form-container">
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
                    placeholder="NEW PASSWORD"
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
                    Reset Password
                </button>
                {showErrorMsg &&<p className="error-message">*{errorMsg}</p>}
                {/* <Link to="/signup" style={{ textDecoration: 'none' }} className='login-text'>
                    Not yet signed up? Sign up here
                </Link> */}
            </form>
        </div>
    )
}

export default ForgotPassword;