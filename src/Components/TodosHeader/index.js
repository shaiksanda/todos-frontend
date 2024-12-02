import Cookies from 'js-cookie'

import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import "./index.css"
const TodosHeader = () => {
    const navigate = useNavigate();
    const username = Cookies.get('username');
    const letters = username.toUpperCase().split("")

    const handleLogout = () => {
        Cookies.remove('jwt_token')
        Cookies.remove('username')
        navigate('/')
    }

    const colors = [
        "#FF5733", "#FF8D1A", "#FFB300", "#FFDC00", "#FF4081", "#F50057", "#D500F9", "#6200EA", "#03A9F4", "#00BCD4",
        "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E",
        "#607D8B", "#26C6DA", "#00E5FF", "#00C853", "#76FF03", "#1DE9B6", "#FF4D4D", "#FF7F50", "#FFD700", "#C71585",
        "#FF6347", "#FF1493", "#DC143C", "#9932CC", "#8A2BE2", "#00FFFF", "#ADFF2F", "#32CD32", "#FF4500", "#DAA520",
        "#D2691E", "#FF69B4", "#FF1493", "#FF00FF", "#C71585", "#F0E68C", "#98FB98", "#00BFFF", "#1E90FF", "#FFFF00",
        "#8B008B", "#800080", "#FF6347", "#FF6A00", "#8B0000", "#800000", "#9ACD32", "#32CD32", "#8FBC8F", "#FFB6C1"
    ];


    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className='todo-header-container'>
            <div>
                <h1 className='welcome-heading'> <span style={{ color: 'black' }}>Welcome </span>
                    {letters.map((letter, index) => (
                        <span key={index} style={{ color: getRandomColor() }}>
                            {letter}
                        </span>
                    ))}</h1>
            </div>
            <div>
                <Popup contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%', // Full width for small devices
                    maxWidth: '400px', // Optional: Limit max width for larger devices


                }}
                    position="right center" modal trigger={<button className='delete-all-todos-button'>Logout</button>}>
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
        </div>
    )
}


export default TodosHeader;