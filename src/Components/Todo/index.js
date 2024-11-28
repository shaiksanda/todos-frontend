import { useState,useEffect} from 'react';
import Calendar from 'react-calendar';
import Cookies from 'js-cookie';
import { FcFilledFilter } from "react-icons/fc";

import 'react-calendar/dist/Calendar.css';

import "./index.css"

const Todo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data,setData]=useState([])

  const [tag, setTag] = useState('');
  const [todo, setTodo] = useState('');
  const [msg,setMsg]=useState("")
  const [showMsg,setShowMsg] = useState(false)

  const [priority, setPriority] = useState('');

  useEffect(()=>{
    const getTodos=async()=>{
      const url = `https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}`;
      const options = {
        method:"GET",
        headers: {
          'content-type':"application/json",
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
        },
      };
      const response=await fetch(url,options)
      const jsonData=await response.json()
      if (response.ok){
        setData(jsonData)
      }
      else{
        console.log("Error in fetching data",response.statusText)
      }
      
    }

    getTodos()
  },[selectedDate])

  const onSubmitSuccess=(data)=>{
        setMsg(data.message)
        setShowMsg(true)
        setTodo("")
        setTag("")
        setPriority("")

        setTimeout(() => {
          setShowMsg(false);
        }, 5000);
  }

  const handleAddTask = async (event) => {
    event.preventDefault();
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
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onSubmitSuccess(data)
  
      } else {
        setMsg(data.message)
        setShowMsg(true)

        setTimeout(() => {
          setShowMsg(false);
        }, 5000);
       
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

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
  const username=Cookies.get('username');
  const letters=username.toUpperCase().split("")

  const colors = ["#FF5733", "#FF8D1A", "#FFB300", "#FFDC00", "#FF4081", "#F50057", "#D500F9", "#6200EA", "#03A9F4", "#00BCD4", 
    "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", 
    "#607D8B", "#26C6DA", "#00E5FF", "#00C853", "#76FF03", "#1DE9B6"];

  const getRandomColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };
  
  return (
    <div className="todos-bg-container">
     <div className="todo-top-container">
        <div className="calendar-container">
          <h1> <span style={{ color: 'black' }}>Welcome </span>
          {letters.map((letter, index) => (
          <span key={index} style={{ color: getRandomColor() }}>
            {letter}
          </span>
          ))}</h1> 
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div>
          <img className="todo-image-1" alt="todo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1732776857/Designer_lucty3.jpg" />
        </div>
        <div className="create-task-container">
          <h1>Create A Task</h1>
          <form onSubmit={handleAddTask} id="form" className="task-container" >
              <label htmlFor="task" className="label">
                TASK
              </label>
              <input value={todo} onChange={handleTodoChange} id="task" placeholder="Enter the Task Here" className="input-element" type="text" />
              <label htmlFor="tag" className='label'>TAG</label>
              <select
                name="tag"
                value={tag}
                onChange={handleTagChange}
                className='input-element'
                style={{ color: 'black' }}
                id="tag"
              >
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Household">Household</option>
              <option value="Family">Family</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
              </select>

              <label htmlFor="priority" className='label'>PRIORITY</label>
            <select
                id="priority"
                name="priority"
                value={priority}
                onChange={handlePriorityChange}
                className='input-element'
                style={{ color: 'black' }}
            > 
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>


              <button type="submit" className="login-button-form">
                Add Task
              </button>
              {showMsg&&<p style={{color:"Orange",fontWeight:"bold"}}>{msg}</p>}
      </form>
        </div>
     </div>

     <h1 className="fetch-todos-heading">Fetching todos for the selected date: <span className="formatted-date-heading">{formattedDate}</span> from the server</h1>
      <div className='todo-bottom-container'>
        <div>
          <h1>Filter</h1>
          <FcFilledFilter />
        </div>
        <div  className='todo-top-container'>
          {data.map((item) => (
            <div className='each-todo' key={item._id}>
              <input className="checkbox" type="checkbox" />
              <p>Task: {item.todo}</p>
              {/* <FaEdit className='icon' title="Edit Task" /> */}
              <button className="icon" title="Edit Task" style={{ color: 'black' }}>📝</button>
              <button className="icon" title="Delete Task" style={{ color: 'red' }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
