import { useState,useEffect} from 'react';
import Calendar from 'react-calendar';
import Confetti from 'react-confetti';

import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner'
import Popup from 'reactjs-popup'

import { FcFilledFilter } from "react-icons/fc";

import 'reactjs-popup/dist/index.css'
import 'react-calendar/dist/Calendar.css';

import "./index.css"

const Todo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data,setData]=useState([])

  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState('');
  const [todo, setTodo] = useState('');
  const [msg,setMsg]=useState("")
  const [showMsg,setShowMsg] = useState(false)

  const [filterTag, setFilterTag] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [taskAdded, setTaskAdded] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false)
  const [showUpdatedMsg, setShowUpdatedMsg] = useState(false)

  const [showConfetti, setShowConfetti] = useState(false);


  
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
  
  
  



  const handleFilterTag=(event)=>{
    setFilterTag(event.target.value)
  }

  const handleFilterPriority=(event)=>{
    setFilterPriority(event.target.value)
  }

  const handleSearch=(event)=>{
    setSearch(event.target.value)
  }

  const handleUpdateTask=async(event,id)=>{
    event.preventDefault()
    const url=`https://todos-backend-d9im.onrender.com/todos/${id}`
    const options = {
      method:"PUT",
      headers: {
        'content-type':"application/json",
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
      body:JSON.stringify({
        todo:todo,
        priority:priority,
        tag:tag
      })
    }
    const response=await fetch(url,options)
    if(response.ok){
      onSubmitSuccess({message:""})
      setTaskUpdated(true);
      setShowUpdatedMsg(true)
    }
    else{
      console.log("Error in updating todo",response.statusText)
      setTaskUpdated(false)
    }
  }

  const handleStatus=(event)=>{
    setStatus(event.target.value)
  }

  const handleRemoveFilters=()=>{
    setFilterTag("")
    setFilterPriority("")
    setSearch("")
    setStatus("")
  }

  useEffect(()=>{
    const getTodos=async()=>{
      setIsLoading(true)
      const url = `https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}&tag=${filterTag}&priority=${filterPriority}&status=${status}`;
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
        setIsLoading(false)
      }
      else{
        console.log("Error in fetching data",response.statusText)
        setIsLoading(false)
      }
      
    }

    getTodos()
  },[selectedDate,filterPriority,filterTag,status,taskAdded,taskUpdated])

  const onSubmitSuccess=(data)=>{
        setMsg(data.message)
        setShowMsg(true)
        setTodo("")
        setTag("")
        setPriority("")

        setTimeout(() => {
          setShowMsg(false);
        }, 5000);
        setTaskAdded(prev => !prev);
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
      if(tag && priority && todo) { 
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
     
      
       
      }
      else{
        setMsg("Please fill out all required fields!")
        setShowMsg(true)
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCheckboxStatus=async(id,currentStatus)=>{
    setIsLoading(true)
    
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const url=`https://todos-backend-d9im.onrender.com/todos/${id}`
    const options={
      method:"PUT",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
      body:JSON.stringify({
        status: newStatus,
      })
    }


    const response=await fetch(url,options)
    const url1='https://todos-backend-d9im.onrender.com/todos'
    const options1={
      method:"GET",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
      },
    }
    const response1=await fetch(url1,options1)
    const jsonData=await response1.json()
    if (response.ok){
      setData(jsonData)
      setIsLoading(false)
    }
    else{
      setIsLoading(false)
      console.log("Error in updating status",response.statusText)
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
  const username=Cookies.get('username');
  const letters=username.toUpperCase().split("")

  const colors = ["#FF5733", "#FF8D1A", "#FFB300", "#FFDC00", "#FF4081", "#F50057", "#D500F9", "#6200EA", "#03A9F4", "#00BCD4", 
    "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", 
    "#607D8B", "#26C6DA", "#00E5FF", "#00C853", "#76FF03", "#1DE9B6"];

  const getRandomColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleDeleteTodo=async(id)=>{
      const url=`https://todos-backend-d9im.onrender.com/todos/${id}`
      const options={
        method:"DELETE",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
        },
      }
      const response=await fetch(url,options)
      const url1=`https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}`
      const options1={
        method:"GET",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`,
        },
      }

      

      const response1=await fetch(url1,options1)
      const jsonData1=await response1.json()
      if (response1.ok){
        setData(jsonData1)
        setIsLoading(false)
      }
      else{
        console.log("Error in fetching data",response.statusText)
        setIsLoading(false)
      }
    
    }

    const handleDeleteAllTodos=async()=>{
      const url=`https://todos-backend-d9im.onrender.com/todos?selectedDate=${selectedDate.toISOString()}`
      const options={
        method:"DELETE",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
        },
      }
      const response=await fetch(url,options)
      if (response.ok){
        setData([])
        setIsLoading(false)
      }
      else{
        console.log("Error in deleting data",response.statusText)
        setIsLoading(false)
      }
    }
    

    const filteredData=data.filter((each)=>each.todo.toLowerCase().includes(search))
  
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
                <option value="default" hidden>Select One</option>
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
                <option value="default" hidden>Select One</option>
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

     <h1 className="fetch-todos-heading">Fetching todos for: <span className="formatted-date-heading">{formattedDate}</span></h1>
     <div style={{textAlign:'right'}}>
     <button onClick={handleDeleteAllTodos} className='delete-all-todos-button'>Delete All Todos</button>
     </div>
     <div className="spinner-container">
     <div className="spinner-container">
      {isLoading && <Oval
        color="green"
        height={50}
        width={50}
        ariaLabel="loading"
      />}
    </div>
    </div>
      <div className='todo-bottom-container'>
        <div>
          {showConfetti && <Confetti />}
        </div>
  
        <div>
          <h1 className='filter-heading'>Use Filters to Organize Your Data <FcFilledFilter size={"30px"} /></h1>
          
          <div className='filters-container'>
            <input onChange={handleSearch} value={search} type="search" placeholder='Search...' className='input-element' />
          <label htmlFor='filterTag' className='label'>TAG</label>
              <select
                id="filterTag"
                value={filterTag}
                onChange={handleFilterTag}
                className='input-element'
                style={{ color: 'black' }}
                
              >
              <option value="default" hidden>Select One</option>
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Household">Household</option>
              <option value="Family">Family</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
              </select>
              <label htmlFor='filterPriority'  className='label'>PRIORITY</label>
            <select
                id="filterPriority"
                value={filterPriority}
                onChange={handleFilterPriority}
                className='input-element'
                style={{ color: 'black' }}
            > 
            <option value="default" hidden>Select One</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <label  htmlFor='status' className='label'>STATUS</label>
            <select
                value={status}
                onChange={handleStatus}
                className='input-element'
                style={{ color: 'black' }}
                id='status'
            > 
            <option value="default" hidden>Select One</option>
                <option value="pending">pending</option>
                <option value="completed">completed</option>
                
            </select>
            <button onClick={handleRemoveFilters} className='remove-filters-button'>Remove Filters</button>
          </div>
          
        </div>
        
        <div  className='todo-top-container'>
        
          {filteredData.length===0 ? (<div className='no-todos-container'>
            
            <img  className='todo-image-1' alt="todo" src="https://img.freepik.com/free-photo/3d-illustration-calendar-with-checkmarks-pen_107791-15855.jpg" />
          <div>
            <p className='no-todos-content'>No Todos for this Date: <span className="formatted-date-heading">{formattedDate}</span></p>
            <h3 style={{fontWeight:"bold",color:"green"}}>Please Try to Add Tasks</h3>
          </div>
          </div>):(filteredData.map((item) => (
            <div className='each-todo' key={item._id}>
              <input checked={item.status==="completed"}  onChange={()=>handleCheckboxStatus(item._id,item.status)} className="checkbox" type="checkbox" />
              <p>{item.todo}</p>
              {/* <FaEdit className='icon' title="Edit Task" /> */}
              
                <Popup contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%', // Full width for small devices
                    maxWidth: '400px', // Optional: Limit max width for larger devices
                    
  
                    }}
                  position="right center" modal
                   trigger={<button  className="icon" title="Edit Task" style={{ color: 'black' }}>
                    📝</button>}>

                  {close => (
                    <div className="update-todo-container">
                    
                    <h1 className='update-heading'>Update Your Task</h1>

                    <form onSubmit={(e)=>handleUpdateTask(e,item._id)} id="form" className="task-container" >
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
                          <option value="default" hidden>Select One</option>
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
                        <option value="default" hidden>Select One</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                
                      </select>
                      <button type="submit" className="login-button-form">
                          UPDATE
                      </button>
                      {showUpdatedMsg && <p style={{color:"green",fontWeight:"bold"}}>Todo Updated Successfully now close this.</p>}
                      <button style={{textAlign:"center"}} onClick={close} className='delete-all-todos-button'>Close</button>

                    </form>
                    <div>   
                </div>
            </div>
          )}
                </Popup>
              
              <button  onClick={()=>handleDeleteTodo(item._id)} className="icon" title="Delete Task" style={{ color: 'red' }}>🗑️</button>
            </div>
          ))) }
          
        </div>
      </div>
    </div>
  );
};

export default Todo;
