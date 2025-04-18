import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Confetti from 'react-confetti';


import Cookies from 'js-cookie';

import Popup from 'reactjs-popup'
import { L8 } from 'react-isloading'

import { FcFilledFilter } from "react-icons/fc";
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';


import 'reactjs-popup/dist/index.css'
import 'react-calendar/dist/Calendar.css';

import "./index.css"

const Todo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([])

  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState('');
  const [todo, setTodo] = useState('');
  const isValid = tag && todo && priority
  const validUpdate=todo && priority && tag
  const [msg, setMsg] = useState("")
  const [showMsg, setShowMsg] = useState(false)

  const [successMsg, setSuccessMsg] = useState("")
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)

  const [filterTag, setFilterTag] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [taskAdded, setTaskAdded] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false)
  const [showUpdatedMsg, setShowUpdatedMsg] = useState(false)

  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false)




  useEffect(() => {
    if (data.length > 0) {
      const allCompleted = data.every(todo => todo.status === 'completed');

      if (allCompleted) {
        setShowConfetti(true);

        const timer = setTimeout(() => {
          setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
      } else {
        setShowConfetti(false);
      }
    }
  }, [data]);

  if (showMsg) {
    setTimeout(() => {
      setShowMsg(false)
      setMsg("")
    }, 5000)
  }



  const handleFilterTag = (event) => {
    setFilterTag(event.target.value)
  }

  const handleFilterPriority = (event) => {
    setFilterPriority(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleUpdateTask = async (event, id) => {
    event.preventDefault()
    setLoading(true)
    const url = `https://todos-backend-d9im.onrender.com/todos/${id}`
    const options = {
      method: "PUT",
      headers: {
        'content-type': "application/json",
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
      body: JSON.stringify({
        todo: todo,
        priority: priority,
        tag: tag
      })
    }
    const response = await fetch(url, options)
    setLoading(false)
    if (response.ok) {
      onSubmitSuccess({ message: "" })
      setTaskUpdated(true);
      setShowUpdatedMsg(true)
      setTimeout(()=>{setShowUpdatedMsg(false)},5000)
      
    }
    else {
      console.log("Error in updating todo", response.statusText)
      setTaskUpdated(false)
    }
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

  useEffect(() => {
    const getTodos = async () => {
      setIsLoading(true)
      const url = `https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}&tag=${filterTag}&priority=${filterPriority}&status=${status}`;
      const options = {
        method: "GET",
        headers: {
          'content-type': "application/json",
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
        },
      };
      const response = await fetch(url, options)
      const jsonData = await response.json()
      if (response.ok) {
        setData(jsonData)
        setIsLoading(false)
      }
      else {
        console.log("Error in fetching data", response.statusText)
        setIsLoading(false)
      }

    }

    getTodos()
  }, [selectedDate, filterPriority, filterTag, status, taskAdded, taskUpdated])

  const onSubmitSuccess = (data) => {
    setSuccessMsg(data.message)
    setShowSuccessMsg(true)
    setTodo("")
    setTag("")
    setPriority("")

    setTimeout(() => {
      setShowSuccessMsg(false);
    }, 5000);
    setTaskAdded(prev => !prev);
  }

  const handleAddTask = async (event) => {
    event.preventDefault();
    setLoading(true)
    const url = 'https://todos-backend-d9im.onrender.com/todos';
    const formattedDate = selectedDate.toISOString();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
      body: JSON.stringify({
        todo,
        tag,
        priority,
        selectedDate: formattedDate,
      }),
    };

    try {
      if (tag && priority && todo) {
        const response = await fetch(url, options);
        const data = await response.json();
        setLoading(false)
        if (response.ok) {
          onSubmitSuccess(data)

        } else {
          setMsg(data.message)
          setShowMsg(true)

          setTimeout(() => {
            setShowMsg(false);
          }, 5000);
        }



      }
      else {
        setMsg("Please fill out all required fields!")
        setShowMsg(true)
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCheckboxStatus = async (id, currentStatus) => {
    setIsLoading(true)

    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const url = `https://todos-backend-d9im.onrender.com/todos/${id}`
    const options = {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
      body: JSON.stringify({
        status: newStatus,
      })
    }

    const response = await fetch(url, options)
    const url1 = `https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}`
    const options1 = {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
    }
    const response1 = await fetch(url1, options1)
    const jsonData = await response1.json()
    if (response.ok) {
      setData(jsonData)
      setIsLoading(false)
    }
    else {
      setIsLoading(false)
      console.log("Error in updating status", response.statusText)
    }

  }

  // Handler for when the selection changes
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formattedDate = `${selectedDate.getDate()}/${selectedDate.toLocaleString('default', { weekday: 'short' })}/${selectedDate.getFullYear()}`;

  const handleDeleteTodo = async (id) => {
    const url = `https://todos-backend-d9im.onrender.com/todos/${id}`
    const options = {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
    }
    const response = await fetch(url, options)
    const url1 = `https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}`
    const options1 = {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`,
      },
    }



    const response1 = await fetch(url1, options1)
    const jsonData1 = await response1.json()
    if (response1.ok) {
      setData(jsonData1)
      setIsLoading(false)
    }
    else {
      console.log("Error in fetching data", response.statusText)
      setIsLoading(false)
    }

  }

  // const handleDeleteAllTodos = async () => {
  //   const url = `https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}`
  //   const options = {
  //     method: "DELETE",
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
  //     },
  //   }
  //   const response = await fetch(url, options)
  //   if (response.ok) {
  //     setData([])
  //     setIsLoading(false)
  //   }
  //   else {
  //     console.log("Error in deleting data", response.statusText)
  //     setIsLoading(false)
  //   }
  // }

  const validFilters = search || filterTag || filterPriority || status
  const filteredData = data.filter((each) => each.todo.toLowerCase().includes(search))

  return (
    <div className="todos-bg-container">
      <TodosHeader />

      <div className='main-content'>
        <div className='confetti-container'>
          {showConfetti && <Confetti />}
        </div>
        <div className="spinner-container">
          <div className="spinner-container">
            {isLoading && <L8
              style={{
                height: "10rem",
                width: "10rem",

              }}
            />}
          </div>
        </div>
        <div className="todo-top-container">
          <div className="calendar-container">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>

          <form onSubmit={handleAddTask} id="form" className="form-element form-container" >
            <h1 style={{ margin: "0px" }} className='create-task-heading'>Create A Task</h1>
            <div className='input-wrapper'>

              <input required value={todo} onChange={handleTodoChange} id="task" className="input-element" type="text" />
              <label htmlFor="task" className="label">
                TASK
              </label>
            </div>
            <select
              name="tag"
              value={tag}
              onChange={handleTagChange}
              className='dropdown'
              style={{ color: 'black' }}
              id="tag"
            >
              <option value="default" hidden>Select One Tag</option>
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
              id="priority"
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
              className='dropdown'
              style={{ color: 'black' }}
            >
              <option value="default" hidden>Select PRIORITY</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>

            </select>
            <button disabled={loading || !isValid} type="submit" className="login-button-form">
              Add Task
            </button>
            {showSuccessMsg && <p className='success-msg'>✅{successMsg}</p>}
            {showMsg && <p style={{ margin: '2px' }} className='error-message'>*{msg}</p>}
          </form>
        </div>

        <h1 className="fetch-todos-heading">Fetching todos for: <span className="formatted-date-heading">{formattedDate}</span></h1>
        {/* <div style={{ textAlign: 'center' }}>
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
        </div> */}


        <div className='todo-bottom-container'>
          <div className='filter-container'>
            <h1 className='filter-heading'>Use Filters to Organize Your Data <FcFilledFilter size={20} /></h1>

            <div className='filters-container'>
              <div className='input-wrapper'>
                <input required id='search' onChange={handleSearch} value={search} type="search" className='input-element todo-input-element' style={{ height: "50px" }} />
                <label htmlFor='search' className='label'>Search...</label>
              </div>

              <select
                id="filterTag"
                value={filterTag}
                onChange={handleFilterTag}
                className='input-element'
                style={{ color: 'black', backgroundColor: "lavender" }}

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
              </select>

              <select
                id="filterPriority"
                value={filterPriority}
                onChange={handleFilterPriority}
                className='input-element'
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
                className='input-element'
                style={{ color: 'black', backgroundColor: "lavender" }}
                id='status'
              >
                <option value="default" hidden>Filter By Status</option>
                <option value="pending">pending</option>
                <option value="completed">completed</option>

              </select>
              <button disabled={loading || !validFilters} onClick={handleRemoveFilters} className='remove-filters-button'>Remove Filters</button>
            </div>
          </div>

          <div className='todo-data-container'>
            {filteredData.length === 0 ? (<div className='no-todos-container'>
              <img className='todo-image-1' alt="todo" src="https://img.freepik.com/free-photo/3d-illustration-calendar-with-checkmarks-pen_107791-15855.jpg" />
              <div>
                <p className='no-todos-content'>No Todos for this Date: <span className="formatted-date-heading">{formattedDate}</span></p>
                <h3 style={{ fontWeight: "bold", color: "green" }}>Please Try to Add Tasks</h3>
              </div>
            </div>) : (filteredData.map((item) => (
              <div className='each-todo' key={item._id}>
                <input checked={item.status === "completed"} onChange={() => handleCheckboxStatus(item._id, item.status)} className="todo-checkbox" type="checkbox" />
                <p className='todo-display' >{item.todo}</p>


                <Popup contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  width: '90%', // Full width for small devices
                  maxWidth: '400px',
                  marginTop: "60px", // Optional: Limit max width for larger devices
                  zIndex: '2500'

                }}
                  className='popup-content'
                  position="right center" modal
                  trigger={<button className="icon" title="Edit Task" style={{ color: 'black' }}>
                    📝</button>}>

                  {close => (
                    <div className="update-todo-container">

                      <h1 className='update-heading'>Update Your Task</h1>

                      <form onSubmit={(e) => handleUpdateTask(e, item._id)} id="form" className="form-container" >
                        <div className='input-wrapper'>
                          <input required value={todo} onChange={handleTodoChange} id="task"  className="input-element" type="text" />
                          <label htmlFor="task" className="label">
                            TASK
                          </label>
                        </div>

                        
                        <select
                          name="tag"
                          value={tag}
                          onChange={handleTagChange}
                          className='dropdown'
                          style={{ color: 'black', backgroundColor: "lavender" }}
                          id="tag"
                        >
                          <option value="default" hidden>Select One Tag</option>
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
                        </select>

                       
                        <select
                          id="priority"
                          name="priority"
                          value={priority}
                          onChange={handlePriorityChange}
                          className='dropdown'
                          style={{ color: 'black', backgroundColor: "lavender" }}
                        >
                          <option value="default" hidden>Select Priority</option>
                          <option value="low">low</option>
                          <option value="medium">medium</option>
                          <option value="high">high</option>

                        </select>
                        <button disabled={loading || !validUpdate} type="submit" className="login-button-form">
                          UPDATE
                        </button>
                        {showUpdatedMsg && <p style={{ color: "green", fontWeight: "bold" }}>Todo Updated Successfully now close this.</p>}
                        <button style={{ textAlign: "center" }} onClick={close} className='login-button-form'>Close</button>

                      </form>
                      <div>
                      </div>
                    </div>
                  )}
                </Popup>

                <button onClick={() => handleDeleteTodo(item._id)} className="icon" title="Delete Task" style={{ color: 'red' }}>🗑️</button>
              </div>
            )))}

          </div>
        </div>
      </div>

      <TodosFooter />
    </div>
  );
};

export default Todo;