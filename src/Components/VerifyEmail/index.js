import { toast } from 'react-toastify';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import "./index.css"
import { useSendOtpMutation, useVerifyOtpMutation } from '../../services/todoService';

const VerifyEmail = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [otpSent, setOtpSent] = useState(false)
    const [otp,setOtp]=useState("")

    const handleOtp=(e)=>{
        setOtp(e.target.value)
    }

    const [sendOtp, { isLoading }] = useSendOtpMutation()
    const [verifyOtp,{isLoading:otpLoading}]=useVerifyOtpMutation()

    const handleSendOtp = async () => {
        try {
            const emailBody = { email }
            const res = await sendOtp(emailBody).unwrap()
            toast.success(res.message)
            setOtpSent(true)
        }
        catch (error) {
            toast.error(error?.data?.err_msg)
        }
    }

    const handleVerifyOtp=async()=>{
        try{
            const otpData={email,otp}
            let res=await verifyOtp(otpData).unwrap()
            toast.success(res.message)
            navigate("/login")
        }
        catch(error){
            toast.error(error?.data?.err_msg)
        }

    }

    // email from state
    const email = state?.email;
    return (
        <div className='login-container'>
            <div className='container'>
                <img alt="verification" className='login-image' src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1756442089/Screenshot_2025-08-29_100412_zypvd5.png" />
            </div>
            <div id="form" className="form-container">
                <h1>Verify Email</h1>
                <input className='input-element' type="email" value={email} readOnly />
                {otpSent && <div className="input-wrapper">
                    <input
                        id="otp"
                        value={otp}
                        onChange={handleOtp}
                        className="input-element"
                        type="text"
                        required
                    />
                    <label htmlFor="otp" className="label">
                        ENTER OTP
                    </label>
                </div>}
                {!otpSent && <button onClick={handleSendOtp} disabled={isLoading} className="login-button-form">
                    {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        Processing...
                        <ClipLoader color="#007bff" size={15} />
                    </span>) : ("Send Otp")}
                </button>}
                {otpSent && <button onClick={handleVerifyOtp} disabled={otpLoading} className="login-button-form">
                    {otpLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        Processing...
                        <ClipLoader color="#007bff" size={15} />
                    </span>) : ("Verify Otp")}
                </button>}
            </div>
        </div>
    )
}

export default VerifyEmail
