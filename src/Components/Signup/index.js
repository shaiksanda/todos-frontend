import { useState } from 'react';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import 'remixicon/fonts/remixicon.css';
import "./index.css"
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("Male")

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)

    const [successMsg, setSuccessMsg] = useState("")
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)

    const [loading,setLoading]=useState(false)

    if (showErrorMsg) {
        setTimeout(() => {
            setShowErrorMsg(false);
            setErrorMsg('');
        }, 5000)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleGender = (event) => {
        setGender(event.target.value)
    }
    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handleFullName = (event) => {
        setFullname(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmitSuccess = (message) => {
        setShowSuccessMsg(true)
        setSuccessMsg(message)
        console.log("Registration successful:", message);
        setTimeout(()=>{
            navigate("/login")
        },2000)
    }

    const handleSubmitError = (errorMsg) => {
        setShowErrorMsg(true)
        setErrorMsg(errorMsg)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!username || !fullname || !password) {
            handleSubmitError("Please fill in all fields.");
            return;
        }
        setLoading(true)

        const userDetails = { username, fullname, password, gender }
        const url = "https://todos-backend-d9im.onrender.com/register"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        setLoading(false)
        if (response.ok) {
            handleSubmitSuccess(data.message)
        }
        else {
            handleSubmitError(data.message)
        }

    }

    const isValid=fullname && username && password && gender
    return (
        <div  className="login-container">
            <div className="container">
                <img className="login-image signup" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749119094/todo-sign-up-image_mowue0.webp" alt="sing-up" />
            </div>
            <form id="form" onSubmit={handleSubmit} className="form-container">
                <div className="input-wrapper">
                    <input required name="fullname" id="fullname" onChange={handleFullName} value={fullname}  className="input-element" type="text" />
                    <label id="fullname" className="label">FULLNAME</label>
                </div>
                <div className="input-wrapper">
                    <input required name="username" id="username" onChange={handleUsername} value={username} className="input-element" type="text" />
                    <label htmlFor='username' className="label">USERNAME</label>
                </div>
                <div>
                    <select  name="gender" id="gender" onChange={handleGender} value={gender} className='dropdown' required style={{ color: gender===""?"gray":"magenta" }}>
                        <option value="default" hidden>Choose Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    {/* <label htmlFor='gender' className='label'>GENDER</label> */}
                </div>
                <div className="input-wrapper">
                
                <input required name="password" id="password" onChange={handlePassword} value={password}  className="input-element" type={showPassword ? "text" : "password"} />
                <label htmlFor='password' className="label" >PASSWORD</label>
                {showPassword ? (<i onClick={handleShowPassword} className="ri-eye-line eye"></i>) : (<i onClick={handleShowPassword} className="ri-eye-off-line eye"></i>)}
                </div>
                {/* <div className="checkbox-container">
                    <input name="checkbox" onChange={handleCheckbox} id="checkbox" type="checkbox" className="checkbox" />
                    <label style={{ cursor: "pointer" }} htmlFor="checkbox" className="label" >Show Password</label>
                </div> */}

                <button disabled={loading || !isValid} type="submit" className="signup-button-form">
                {loading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px",justifyContent:"center" }}>
                    Processing...
                    <ClipLoader color="#007bff" size={15} />
                </span>) : ("Sign Up")}
                </button>
                {showSuccessMsg && <p className='success-msg'>✅{successMsg} Please Login Now</p>}
                {showErrorMsg && <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>}
                <Link to="/login" style={{ textDecoration: "none" }} className='login-text'>Already signed up? Log in</Link>
            </form>
        </div>
    )
}

export default Signup