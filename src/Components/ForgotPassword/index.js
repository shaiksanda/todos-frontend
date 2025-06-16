
import { useState } from "react"
import { toast } from "react-toastify";

import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

import "./index.css"
import { useForgotPasswordMutation } from "../../services/todoService";

const ForgotPassword = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [forgotPassword,{isLoading}]=useForgotPasswordMutation()

    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    

    const handleForm = async (event) => {
        event.preventDefault();
        
        if (!username || !password) {
            toast.error('Please fill in both fields.'); 
            return;
        }
        const userDetails = { username, password }
        try{
            await forgotPassword(userDetails).unwrap()
            toast.success("Password Updated Successfully")
            navigate("/login")
        }
        catch(error){
            toast.error(error?.data?.message)
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
                <button disabled={isLoading || !isValid} type="submit" className="login-button-form">
                {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px",justifyContent:"center" }}>
                    Processing...
                    <ClipLoader color="#007bff" size={15} />
                </span>) : ("Reset Password")}
                </button>
                <button onClick={()=>navigate("/login")} style={{backgroundColor:"blue"}} className="login-button-form">Go Back</button>
                
            </form>
        </div>
    )
}

export default ForgotPassword;