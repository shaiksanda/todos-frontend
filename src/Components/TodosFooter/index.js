import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { LuLogOut } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";

import { useNavigate, } from 'react-router-dom';
import Popup from 'reactjs-popup'
import "./index.css"
const TodosFooter = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt_token')
        Cookies.remove('username')
        navigate('/')
    }

    console.log()
    return (
        <footer className="footer">
            <div className="navigation-container">
                <Link to="/todo"><AiFillHome style={{ color: "black" }} size={25} /></Link>
                <Link className="remove-styling" to="/todo"><p style={{ color: "black" }} className="navigation-content">Home</p></Link>
            </div>
            <div className="navigation-container">
                <Link className="remove-styling" to="/menu"><IoMdMenu style={{ color: "black" }} size={25} /></Link>
                <Link className="remove-styling" to="/menu"><p style={{ color: "black" }} className="navigation-content">Menu</p></Link>
            </div>
            <div className="navigation-container">
                <Popup contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%', // Full width for small devices
                    maxWidth: '400px', // Optional: Limit max width for larger devices


                }}
                    position="right center" modal trigger={
                        <div>
                            <div className="navigation-container">
                                <LuLogOut
                                    size={25}
                                    color="black"
                                />
                                <p style={{color:"black"}} className="navigation-content">Logout</p>
                            </div>
                        </div>
                    }>
                    {close => (
                        <div className="logout-container">
                            <div>
                                <h1 className='popup-heading'>Are you sure you want to logout?</h1>
                                <div className='popup-buttons'>
                                    <button className='close-button' onClick={close}>Close</button>
                                    <button className='confirm-button' onClick={() => handleLogout(close)}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </footer>
    )
}

export default TodosFooter;