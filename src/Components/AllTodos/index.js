import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Popup from 'reactjs-popup'
import { L8 } from 'react-isloading'

import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import "./index.css"

const AllTodos = () => {

    const [data, setData] = useState([])

    const [filterTag, setFilterTag] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const url = `https://todos-backend-d9im.onrender.com/todos?tag=${filterTag}&priority=${filterPriority}&status=${status}`
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
                setIsLoading(false)
            }
            else {
                console.log("Failed to fetch data")
                setIsLoading(false)
            }
        }
        fetchData()
    }, [filterTag,filterPriority,search,status])

    const handleFilterTag = (event) => {
        setFilterTag(event.target.value)
    }

    const handleFilterPriority = (event) => {
        setFilterPriority(event.target.value)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleRemoveFilters = () => {
        setFilterTag("")
        setFilterPriority("")
        setSearch("")
        setStatus("")
    }

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
            setData([])
            close()
        }
        else {
            console.log("")
        }
    }
    const filteredData = data.filter((each) => each.todo.toLowerCase().includes(search))

    return (
        <div>
            <TodosHeader />

            <div className='all-todos-container'>
                <div className='filter-container-1'>
                    <div className='filter-item input-wrapper'>
                        <input required onChange={handleSearch} value={search} id="search" type="search"  className='input-element special-input' />
                        <label htmlFor='search' className='label'>SEARCH</label>
                    </div>
                    <div className='filter-item'>
                        
                        <select
                            name="tag"
                            value={filterTag}
                            onChange={handleFilterTag}
                            className='dropdown-all-todos'
                            style={{ color: 'black' }}
                            id="tag"
                        >
                            <option value="default" hidden>Filter By Tag</option>
                            <option value="Work">Work</option>
                            <option value="Education">Education</option>
                            <option value="Revision">Revision</option>
                            <option value="Health">Health</option>
                            <option value="Finance">Finance</option>
                            <option value="Household">Household</option>
                            <option value="Family">Family</option>
                            <option value="Travel">Travel</option>
                            <option value="Personal">Personal</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Hobbies">Hobbies</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Social">Spiritual</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Appointments">Appointments</option>
                            <option value="Maintenance">Maintenance</option>

                            <option value="Chores">Others</option>

                        </select>
                    </div>
                    <div className='filter-item'>
                        
                        <select
                            id="filterPriority"
                            value={filterPriority}
                            onChange={handleFilterPriority}
                            className='dropdown-all-todos'
                            style={{ color: 'black', backgroundColor: "lavender" }}
                        >
                            <option value="default" hidden>Filter By Priority</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <div className='filter-item'>
                       
                        <select
                            value={status}
                            onChange={handleStatus}
                            className='dropdown-all-todos'
                            style={{ color: 'black', }}
                            id='status'
                        >
                            <option value="default" hidden>Filter By Status</option>
                            <option value="pending">pending</option>
                            <option value="completed">completed</option>

                        </select>
                    </div>

                    <div className='filters-buttons'>
                        <button onClick={handleRemoveFilters} className='remove-filters-button-1'>Remove Filters</button>
                        <Popup contentStyle={{ backgroundColor: "white", border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }} modal trigger={<button style={{ height: "50px" }} className='delete-all-todos-button'>Delete All Todos</button>}>
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

                </div>
                {isLoading ? (<L8 style={{
                    height: "10rem",
                    width: "10rem",
                }} />) : (<div className='data-container'>
                    {filteredData.length===0?(<div className='no-data-found-container'>
                        <img className='no-data-found' alt="no-data-found" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F027%2F998%2F019%2Foriginal%2Ffolder-concept-no-data-data-folder-is-corrupt-missing-files-confused-characters-with-missing-or-non-existent-files-illustration-for-website-landing-page-mobile-app-poster-and-banner-vector.jpg&f=1&nofb=1&ipt=28df7806b768e304e8df698ab5d7a4e134faafeb110d17c1e37568630f896cf3&ipo=images" />
                        <h1 className='heading'>OOPS! No Data Found</h1>
                    </div>):(filteredData.map((each) => (
                        <div className='each-todo-data' key={each._id}>
                            <h2 className='todo-data-heading'>Todo: <span className='style-item'>{each.todo}</span></h2>
                            <h2 className='todo-data-heading'>Priority: <span className='style-item'>{each.priority}</span></h2>
                            <h2 className='todo-data-heading'>Status: <span className='style-item'>{each.status}</span></h2>
                            <h2 className='todo-data-heading'>Tag: <span className='style-item'>{each.tag}</span></h2>
                            <h2 className='todo-data-heading'>Date: <span className='style-item'>{new Date(each.selectedDate).toISOString().split('T')[0]}</span></h2>
                        </div>
                    )))}
                </div>)}
            </div>
            <TodosFooter />
        </div>
    )
}

export default AllTodos
