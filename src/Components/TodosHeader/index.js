import Cookies from 'js-cookie'

import { useNavigate, Link } from 'react-router-dom';
import Popup from 'reactjs-popup'
// import { MdDashboard } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";


import 'reactjs-popup/dist/index.css'
import "./index.css"
const TodosHeader = () => {
  const navigate = useNavigate();

  const username = Cookies.get('username');
  


  const handleLogout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('username')
    navigate('/')
  }



  
  return (
    <header className='todo-header-container'>
      <div>
        <Link to="/all-todos"><img className="todo-logo-1" alt="logo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749119305/todo-logo_xwljwp.webp" /></Link>
      </div>
      <div>
        <h1 className='username-heading'>Welcome {(username || 'User').toUpperCase()}</h1>
      </div>
      <div className='dashboard'>
        <Link to="/todo" className='remove-styling'><h1 className='navigation-heading'>Home</h1></Link>
      </div>
      <div className='dashboard'>
        <Link to="/dashboard" className='remove-styling' ><h1 className='navigation-heading'>Dashboard</h1></Link>
      </div>

      <div>
        <MdOutlineLightMode className='light-mode' size={25} />
      </div>
      <div>
        <Popup contentStyle={{
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '12px',
          width: '90%', // Full width for small devices
          maxWidth: '400px', // Optional: Limit max width for larger devices


        }}
          position="right center" modal trigger={
            <div>
              <button type="button" className="logout-button">
                Logout
              </button>
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
    </header>
  )
}


export default TodosHeader;