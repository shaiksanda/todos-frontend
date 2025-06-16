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
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")

    const [userRegister,{isLoading}]=useUserRegisterMutation()

    const navigate = useNavigate();

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
    const handleSubmitSuccess = () => {
       navigate("/login")
       toast.success("User Registered Successfully")
    }

    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!username || !fullname || !password || !gender) {
            toast.error("Please fill in all fields.");
            return;
        }
        
        const userDetails = { username, fullname, password, gender }
        try{
            await userRegister(userDetails).unwrap()
            handleSubmitSuccess()
        }
        catch(error){
            const message=error?.data?.message||error?.error || "User Registration Failed"
            toast.error(message)
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
                    <label htmlFor="fullname" className="label">FULLNAME</label>
                </div>
                <div className="input-wrapper">
                    <input required name="username" id="username" onChange={handleUsername} value={username} className="input-element" type="text" />
                    <label htmlFor='username' className="label">USERNAME</label>
                </div>
                <div>
                    <select  name="gender" id="gender" onChange={handleGender} value={gender} className='dropdown' required style={{ color: "magenta" }}>
                        <option value="" hidden>Choose Gender</option>
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
                <button disabled={isLoading || !isValid} type="submit" className="signup-button-form">
                {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px",justifyContent:"center" }}>
                    Processing...
                    <ClipLoader color="#007bff" size={15} />
                </span>) : ("Sign Up")}
                </button>
                <Link to="/login" style={{ textDecoration: "none" }} className='login-text'>Already signed up? Log in</Link>
            </form>
        </div>
    )
}

export default Signup