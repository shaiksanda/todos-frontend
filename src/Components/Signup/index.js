import {useState} from 'react';
import {Link} from "react-router-dom"
import { useNavigate} from 'react-router-dom';
import "./index.css"
const Signup =()=>{
    const [showPassword,setShowPassword]=useState(false)
    const [username,setUsername]=useState("")
    const [fullname,setFullname]=useState("")
    const [password,setPassword]=useState("")
    const [gender,setGender]=useState("Male")

    const navigate = useNavigate();

    const [errorMsg,setErrorMsg]=useState("")
    const [showErrorMsg,setShowErrorMsg]=useState(false)

    const [successMsg,setSuccessMsg]=useState("")
    const [showSuccessMsg,setShowSuccessMsg]=useState(false)

    const handleCheckbox=()=>{
        setShowPassword(!showPassword)
    }

    const handleGender=(event)=>{
        setGender(event.target.value)
    }

    const handleUsername=(event)=>{
        setUsername(event.target.value)
    }

    const handleFullName=(event)=>{
        setFullname(event.target.value)
    }

    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }

    const handleSubmitSuccess=(message)=>{
        setShowSuccessMsg(true)
        setSuccessMsg(message)
        console.log("Registration successful:", message);
        navigate("/login")
    }

    const handleSubmitError=(errorMsg)=>{
        setShowErrorMsg(true)
        setErrorMsg(errorMsg)
    }

    const handleSubmit=async(event)=>{
        event.preventDefault()
        if (!username || !fullname || !password) {
            handleSubmitError("Please fill in all fields.");
            return;
        }
        
        const userDetails = {username,fullname,password,gender}
        const url="https://todos-backend-d9im.onrender.com/register"
        const options={
            method:"POST",
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)   
        }

        const response= await fetch(url, options)
        const data=await response.json()
        console.log(data)
        if(response.ok){
            handleSubmitSuccess(data.message)
        }
        else{
            handleSubmitError(data.message)
        }

    }



    return(
        <div className="login-container">
            <div className="container">
                <img className="signup-image" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1732344145/WhatsApp_Image_2024-11-23_at_12.09.56_PM_bd450l.jpg" alt="login" />
            </div>
            <form id="form" onSubmit={handleSubmit} className="form-element form-container">
                <label id="fullname" className="label">FULLNAME</label>
                <input name="fullname" id="fullname" onChange={handleFullName} value={fullname} placeholder="FULLNAME" className="input-element" type="text" />
                <label htmlFor='username' className="label">USERNAME</label>
                <input name="username" id="username" onChange={handleUsername} value={username} placeholder="USERNAME" className="input-element" type="text" />
                <label htmlFor='gender' className='label'>GENDER</label>
                <select name="gender" id="gender" onChange={handleGender} value={gender} className='input-element' style={{color:'black'}}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
                <label htmlFor='password' className="label" >PASSWORD</label>
                <input name="password" id="password" onChange={handlePassword} value={password} placeholder="password" className="input-element" type={showPassword?"text":"password"} />
                <div className="checkbox-container">    
                    <input name="checkbox"  onChange={handleCheckbox} id="checkbox" type="checkbox" className="checkbox" />
                    <label style={{cursor:"pointer"}} htmlFor="checkbox" className="label" >Show Password</label>
                </div>

                <button type="submit" className="signup-button-form">Signup</button>
                {showSuccessMsg && <p>{successMsg}</p>}
                {showErrorMsg && <p style={{color:"red",fontWeight:"bold"}}>{errorMsg}</p>}
                <Link to="/login" style={{textDecoration:"none"}}>Already signed up? Log in</Link>
            </form>
        </div>
    )
}

export default Signup