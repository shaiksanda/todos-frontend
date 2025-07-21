import { useState } from 'react';

import { useDeleteAllTodosMutation, useGetTodosQuery } from '../../services/todoService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useMediaQuery } from 'react-responsive';

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import AddTodoIcon from '../AddTodoIcon';
import "./index.css"

const AllTodos = () => {

    const [filterTag, setFilterTag] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const { data, error, isFetching, isError } = useGetTodosQuery({ tag: filterTag, priority: filterPriority, status })

    const [deleteAllTodos] = useDeleteAllTodosMutation()

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

    const handleDeleteAllTodos = async (close) => {
        try {
            await deleteAllTodos().unwrap()
            toast.success("All Todos Deleted Successfully")
        }
        catch (error) {
            toast.error(error?.data?.error || "Error While Deleting All Todos")
        }
        finally {
            close()
        }

    }

    const validFilters = search || filterTag || filterPriority || status
    const filteredData = data?.filter((each) => each.todo.toLowerCase().includes(search.toLowerCase()))
    const isSmallScreen = useMediaQuery({ maxWidth: 767 })
    const skeletonCount = isSmallScreen ? 3 : 6
    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <main className='main-container'>
                <div className='filter-container'>
                    <h1 className='filter-heading'>Use Filters To Organize Your Data</h1>
                    <div className='filters-container all-todos'>
                        <div style={{ width: "100%" }} className='input-wrapper'>
                            <input required onChange={handleSearch} value={search} id="search" type="search" className='input-element' />
                            <label htmlFor='search' className='label'>Search...</label>
                        </div>
                        <select
                            name="tag"
                            value={filterTag}
                            onChange={handleFilterTag}
                            className='todo-input input-element'
                            style={{ color: 'black', backgroundColor: "lavender" }}
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
                        <select
                            id="filterPriority"
                            value={filterPriority}
                            onChange={handleFilterPriority}
                            className='todo-input input-element'
                            style={{ color: 'black', backgroundColor: "lavender" }}
                        >
                            <option value="default" hidden>Filter By Priority</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                        <select
                            value={status}
                            onChange={handleStatus}
                            className='todo-input input-element'
                            style={{ color: 'black', backgroundColor: "lavender" }}
                            id='status'
                        >
                            <option value="default" hidden>Filter By Status</option>
                            <option value="pending">pending</option>
                            <option value="completed">completed</option>

                        </select>
                        <button style={{ backgroundColor: 'red', color: "white", width: '100%' }} disabled={isFetching || !validFilters} onClick={handleRemoveFilters} className='remove-filters-button btn1'>Remove Filters</button>
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
                {isFetching ? (
                    <h2 style={{ textAlign: 'center', color: 'black', margin: '1rem 0' }}>
                        All the todos are fetching… Please wait, it may take some time.
                    </h2>
                ):(<h1 style={{textAlign:"center",color:"blue"}}>All Tasks</h1>)}
                {isFetching ? (
                    <div className='todo-grid-container'>
                        {[...Array(skeletonCount)].map((_, i) => (
                            <div key={i} className='skeleton'>
                                <Skeleton height={120} />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className='error-msg'>
                        <p>
                            {error?.data?.message || error?.error || "Something went wrong. Please try again."}
                        </p>
                        {error?.status === "FETCH_ERROR" && (
                            <p style={{ color: "orange", fontWeight: 600 }}>
                                Server seems unreachable. Check your internet connection or try again later.
                            </p>
                        )}
                    </div>
                ) : (

                    filteredData.length === 0 ? (
                        <div className='no-todos-container'>
                            <img
                                className='todo-image-1'
                                alt="no-data-found"
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F027%2F998%2F019%2Foriginal%2Ffolder-concept-no-data-data-folder-is-corrupt-missing-files-confused-characters-with-missing-or-non-existent-files-illustration-for-website-landing-page-mobile-app-poster-and-banner-vector.jpg&f=1&nofb=1&ipt=28df7806b768e304e8df698ab5d7a4e134faafeb110d17c1e37568630f896cf3&ipo=images"
                            />
                            <h1 className='heading'>OOPS! No Data Found</h1>
                        </div>
                    ) : (
                        <div className='todo-grid-container'>
                            {filteredData.map((each) => (
                                <div className='each-todo column' key={each._id}>
                                    <h2 className='todo-data-heading'>
                                        Todo: <span className='style-item'>{each.todo}</span>
                                    </h2>
                                    <h2 className='todo-data-heading'>
                                        Priority: <span className='style-item'>{each.priority}</span>
                                    </h2>
                                    <h2 className='todo-data-heading'>
                                        Status: <span className='style-item'>{each.status}</span>
                                    </h2>
                                    <h2 className='todo-data-heading'>
                                        Tag: <span className='style-item'>{each.tag}</span>
                                    </h2>
                                    <h2 className='todo-data-heading'>
                                        Date: <span className='style-item'>{new Date(each.selectedDate).toISOString().split('T')[0]}</span>
                                    </h2>
                                </div>
                            ))}
                        </div>
                    )

                )}
            </main>
            <AddTodoIcon />
            <TodosFooter />
        </div>
    )
}

export default AllTodos
