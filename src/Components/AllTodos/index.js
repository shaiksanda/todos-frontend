import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Popup from 'reactjs-popup'
// import { L8} from 'react-isloading'

import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import "./index.css"

const AllTodos = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://todos-backend-d9im.onrender.com/todos"
            const options = {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt_token')}`,
                },
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const jsonData = await response.json()
                setData(jsonData)
            }
            else {
                console.log("Failed to fetch data")
            }
        }
        fetchData()
    }, [])

    const handleDeleteAllTodos = async () => {
        const url = `https://todos-backend-d9im.onrender.com/todos}`
        const options = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
            },
        }
        const response = await fetch(url, options)
        if (response.ok) {
            console.log("")
        }
        else {
            console.log("")
        }
    }
    return (
        <div>
            <TodosHeader />
            {/* <div className="all-todos-container">
                <p style={{textAlign:"center"}}>This feature is coming soon! Stay tuned for updates—we can’t wait to share it with you</p>
            </div> */}
            <div className='all-todos-container'>
                <div style={{textAlign:"right"}}>
                <Popup contentStyle={{ backgroundColor: "white", border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }} modal trigger={<button className='delete-all-todos-button'>Delete All Todos</button>}>
                    {close => (
                        <div className='logout-container'>
                            <h1 className='popup-heading'>Are you sure? All your todos will be permanently deleted!</h1>
                            <div className='popup-buttons'>
                                <button className='close-button' onClick={close}>Close</button>
                                <button className='confirm-button' onClick={() => handleDeleteAllTodos(close)}>Confirm</button>
                            </div>
                        </div>
                    )}
                </Popup>
                </div>
                <div>
                <h1>We need to add filters here. This feature will be added soon.</h1>

                </div>
                <div className='data-container'>
                    {data.map((each)=>(
                        <div className='each-todo-data' key={each._id}>
                            <h2 className='todo-data-heading'>Todo: <span className='style-item'>{each.todo}</span></h2>
                            <h2 className='todo-data-heading'>Priority: <span className='style-item'>{each.priority}</span></h2>
                            <h2 className='todo-data-heading'>Status: <span className='style-item'>{each.status}</span></h2>
                            <h2 className='todo-data-heading'>Tag: <span className='style-item'>{each.tag}</span></h2>
                        </div>
                    ))}
                </div>
            </div>
            <TodosFooter />
        </div>
    )
}

export default AllTodos