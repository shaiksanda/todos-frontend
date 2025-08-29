
import { useState } from "react"
import { toast } from "react-toastify";

import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

import "./index.css"
import { useResetPasswordMutation, useSendOtpMutation, useVerifyOtpMutation } from "../../services/todoService";



const ForgotPassword = () => {

    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const [sendOtp, { isLoading: otpSendLoading }] = useSendOtpMutation()
    const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation()

    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [email, setEmail] = useState('')

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const [otpSent, setOtpSent] = useState(false)
    const [verified, setVerified] = useState(false)
    const [otp, setOtp] = useState("")

    const handleOtp = (e) => {
        setOtp(e.target.value)
    }

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

    const handleVerifyOtp = async () => {
        try {
            const otpData = { email, otp }
            let res = await verifyOtp(otpData).unwrap()
            toast.success(res.message)
            setVerified(true)

        }
        catch (error) {
            toast.error(error?.data?.err_msg)
        }

    }


    const handleForm = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in both fields.');
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be Atleast 6 Characters Long");
            return;
        }
        const userDetails = { email, password }
        try {
            let res = await resetPassword(userDetails).unwrap()
            toast.success(res.msg)
            navigate("/login")
        }
        catch (error) {
            toast.error(error?.data?.err_msg);
        }
    }

    const isValidToSentOtp = email

    const isValid = email && password
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
                <h1>Reset Password</h1>
                <div className="input-wrapper">

                    <input
                        id="email"
                        value={email}
                        onChange={handleEmail}

                        className="input-element"
                        type="text"
                        required
                    />
                    <label htmlFor="email" className="label">
                        Enter Your Mail
                    </label>
                </div>
                {!otpSent && <button onClick={handleSendOtp} disabled={otpSendLoading || !isValidToSentOtp} className="login-button-form">
                    {otpSendLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        Processing...
                        <ClipLoader color="#007bff" size={15} />
                    </span>) : ("Send Otp")}
                </button>}
                {(otpSent && !verified) && <div className="input-wrapper">
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

                {(otpSent && !verified) && <button onClick={handleVerifyOtp} disabled={verifyOtpLoading} className="login-button-form">
                    {verifyOtpLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        Processing...
                        <ClipLoader color="#007bff" size={15} />
                    </span>) : ("Verify Otp")}
                </button>}
                {(otpSent && verified) && <div className="input-wrapper">

                    <input
                        id="password"
                        value={password}
                        onChange={handlePassword}
                        required
                        className="input-element"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <label htmlFor="otp" className="label">
                        NEW PASSWORD
                    </label>
                    {showPassword ? (<i onClick={handleShowPassword} className="ri-eye-line eye"></i>) : (<i onClick={handleShowPassword} className="ri-eye-off-line eye"></i>)}
                </div>}
                {verified && <button disabled={isLoading || !isValid} type="submit" className="login-button-form">
                    {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                        Processing...
                        <ClipLoader color="#007bff" size={15} />
                    </span>) : ("Reset Password")}
                </button>}
                <button onClick={() => navigate("/login")} style={{ backgroundColor: "blue" }} className="login-button-form">Go Back</button>

            </form>
        </div>
    )
}

export default ForgotPassword;