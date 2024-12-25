import {Link} from "react-router-dom"
import "./index.css"

const Header=()=>{
    return(
        <div className="header-container">
            <div>
                <img className="todo-logo" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1732187200/Screenshot_2024-11-21_162706-removebg-preview_jpwc5d.png" />
            </div>
            <div className="buttons-container">
                <Link to="/login"><button className="login-button">Login</button></Link>
                <Link to="/signup"><button className="signup-button">Signup</button></Link>
            </div>
        </div>
    )
}

export default Header;