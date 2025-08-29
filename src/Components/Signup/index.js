import { useState } from 'react';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css';
import "./index.css"
import { useUserRegisterMutation } from '../../services/todoService';
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    

    const [userRegister, { isLoading }] = useUserRegisterMutation()

    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmitSuccess = (msg) => {
        navigate("/verify-email",{ state: { email } })
        toast.success(msg)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!username || !email || !password ) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password.length<6){
            toast.error("Password must be Atleast 6 Characters Long");
            return;
        }

        const userDetails = { username,email , password,  }
        try {
            let res=await userRegister(userDetails).unwrap()
            handleSubmitSuccess(res.message)
        }
        catch (error) {
            toast.error(error?.data?.err_msg);
        }
    }

    const isValid = email && username && password
    return (
        <div className="login-container">
            <div className="container">
                <img className="login-image signup" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749119094/todo-sign-up-image_mowue0.webp" alt="sing-up" />
            </div>
            <form id="form" onSubmit={handleSubmit} className="form-container">
                <div className="input-wrapper">
                    <input required name="username" id="username" onChange={handleUsername} value={username} className="input-element" type="text" />
                    <label htmlFor='username' className="label">USERNAME</label>
                </div>
                <div className="input-wrapper">
                    <input required name="email" id="email" onChange={handleEmail} value={email} className="input-element" type="email" />
                    <label htmlFor="email" className="label">EMAIL</label>
                </div>
                
                <div className="input-wrapper">
                    <input required name="password" id="password" onChange={handlePassword} value={password} className="input-element" type={showPassword ? "text" : "password"} />
                    <label htmlFor='password' className="label" >PASSWORD</label>
                    {showPassword ? (<i onClick={handleShowPassword} className="ri-eye-line eye"></i>) : (<i onClick={handleShowPassword} className="ri-eye-off-line eye"></i>)}
                </div>
                <button disabled={isLoading || !isValid} type="submit" className="signup-button-form">
                    {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        Processing...
                        <ClipLoader color="#007bff" size={15} />
                    </span>) : ("Sign Up")}
                </button>
                <Link to="/login" style={{ textDecoration: "none" }} className='login-text'>Already signed up? Login</Link>
            </form>
        </div>
    )
}

export default Signup