import {Link} from "react-router-dom"
import { HeaderButton,HeaderContainer } from "../../styles"
import "./index.css"
import { useSelector } from "react-redux"

const Header=()=>{
    const theme=useSelector(state=>state.theme.theme)
    return(
        <HeaderContainer bg={theme?.header.bg} color={theme?.header?.text}>
            <div>
                <img className="todo-logo-1" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1753526930/Screenshot_2025-07-26_161649_cq1yfv.webp" />
            </div>
            <div className="buttons-container">
                <Link to="/login" className="login-button"><HeaderButton bg={theme?.header?.button?.bg} color={theme?.header.button.text}  >Login</HeaderButton></Link>
                <Link to="/signup" className="login-button"><HeaderButton bg={theme?.header?.button?.bg} color={theme?.header.button.text}>Signup</HeaderButton></Link>
            </div>
        </HeaderContainer>
    )
}

export default Header;