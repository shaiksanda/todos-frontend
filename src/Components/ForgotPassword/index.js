// import { Link } from "react-router-dom"
import { useState } from "react"

import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

import "./index.css"

const ForgotPassword = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading,setLoading]=useState(false)

    const navigate = useNavigate();

    if (showErrorMsg) {
        setTimeout(() => {
            setShowErrorMsg(false);
            setErrorMsg('');
        }, 5000)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSuccess = () => {
        setShowSuccessMsg(true)
        setSuccessMsg("Password Updated Successfully, Please wait, you will be redirected to login page.")
        setTimeout(()=>{
            navigate('/login')
        },2000)
    }

    const handleForm = async (event) => {
        event.preventDefault();
        setLoading(true)
        if (!username || !password) {
            setErrorMsg('Please fill in both fields.');
            setShowErrorMsg(true)
            return;
        }
        const userDetails = { username, password }
        const url = "https://todos-backend-d9im.onrender.com/forgotPassword"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(userDetails)
        }
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            setLoading(false)
            if (response.ok) {
                onSubmitSuccess()
            }
            else {
                setErrorMsg(data.message)
                setShowErrorMsg(true)
            }
        }
        catch (error) {
            setErrorMsg("An error occurred while resetting your password. Please try again.")
            setShowErrorMsg(true)
        }

    }

    const isValid=username && password
    return (
        <div className="login-container">
            <div className="container">
                <img
                    className="login-image"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F174%2F758%2Fnon_2x%2Fforgot-password-landing-page-template-vector.jpg&f=1&nofb=1&ipt=e7ee9149cc0356c966298c2b0b48340f99fdf870dd86235ff7e7c15a6c361784&ipo=images"
                    alt="login"
                    style={{ borderRadius: '10px' }}
                />
            </div>
            <form onSubmit={handleForm} id="form" className="form-container">
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
                <div className="input-wrapper">
                
                <input
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    required
                    className="input-element"
                    type={showPassword ? 'text' : 'password'}
                />
                <label htmlFor="password" className="label">
                   NEW PASSWORD
                </label>
                {showPassword ? (<i onClick={handleShowPassword} className="ri-eye-line eye"></i>) : (<i onClick={handleShowPassword} className="ri-eye-off-line eye"></i>)}
                </div>
                <button disabled={loading || !isValid} type="submit" className="login-button-form">
                {loading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px",justifyContent:"center" }}>
                    Processing...
                    <ClipLoader color="#007bff" size={15} />
                </span>) : ("Reset Password")}
                </button>
                {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
                {showSuccessMsg && <p className="success-msg">✅{successMsg}</p>}
                {/* <Link to="/signup" style={{ textDecoration: 'none' }} className='login-text'>
                    Not yet signed up? Sign up here
                </Link> */}
            </form>
        </div>
    )
}

export default ForgotPassword;