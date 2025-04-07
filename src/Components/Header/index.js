import {Link} from "react-router-dom"
import {motion} from "framer-motion"
import "./index.css"

const Header=()=>{
    return(
        <div className="header-container">
            <div>
                <img className="todo-logo" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1732187200/Screenshot_2024-11-21_162706-removebg-preview_jpwc5d.png" />
            </div>
            <div className="buttons-container">
                <Link to="/login"><motion.button drag whileTap={{scale:0.6}} className="login-button">Login</motion.button></Link>
                <Link to="/signup"><motion.button drag whileTap={{scale:0.6}} className="signup-button">Signup</motion.button></Link>
            </div>
        </div>
    )
}

export default Header;