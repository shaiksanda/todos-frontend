import { useState, useEffect, } from 'react';
import Calendar from 'react-calendar';
import Confetti from 'react-confetti';

import Popup from 'reactjs-popup'
import { L8 } from 'react-isloading'

import { FcFilledFilter } from "react-icons/fc";
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import { toast } from 'react-toastify';

import 'reactjs-popup/dist/index.css'
import 'react-calendar/dist/Calendar.css';

import "./index.css"
import { useUpdateTodoMutation, useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoStatusMutation } from '../../services/todoService';
const tagOptions = ["Work", "Coding Practice", "Revision", "Learning", "English Speaking Practice", "Entertainment", "Family", "Finance",
  "Fitness", "Groceries", "Health", "Hobbies", "Household", "Maintenance",
  "Personal", "Shopping", "Spiritual", "Travel"]
const Todo = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState('');
  const [todo, setTodo] = useState('');
  const [editTodo, setEditTodo] = useState("")
  const [editTag, setEditTag] = useState("")
  const [editPriority, setEditPriority] = useState("")

  const [status, setStatus] = useState('');
  const { data, isLoading, } = useGetTodosQuery({ tag, status, priority, selectedDate: selectedDate.toISOString() })
  const [deleteTodo] = useDeleteTodoMutation()
  const [updateTodoStatus] = useUpdateTodoStatusMutation()
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()

  const isValid = tag && todo && priority
  const validUpdate = editTodo && editPriority && editTag

  const [filterTag, setFilterTag] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [search, setSearch] = useState('');

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
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

  const handleFilterTag = (event) => {
    setFilterTag(event.target.value)
  }

  const handleFilterPriority = (event) => {
    setFilterPriority(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleUpdateTask = async (event, id, close) => {
    event.preventDefault()
    if (!id) {
      toast.error("Todo ID is missing.");
      return;
    }

    const updatedTodo = { todo: editTodo, tag: editTag, priority: editPriority }

    try {
      await updateTodo({ id, ...updatedTodo }).unwrap()
      toast.success("Todo Updated Successfully")
      close()
    }
    catch (error) {
      toast.error(error?.data?.message || "Failed to Update Todo")
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

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!tag || !priority || !todo) {
      toast.error("Please fill out all required fields!");
      return;
    }
    try {
      const formattedDate = selectedDate.toISOString();
      const newTodo = { todo, tag, priority, selectedDate: formattedDate };

      await addTodo(newTodo).unwrap();
      toast.success("Task added successfully!");
      setTag("")
      setTodo("")
      setPriority("")


    }
    catch (error) {
      toast.error(error?.data?.message || "Failed to Add Task")
    }






  };

  const handleCheckboxStatus = async (todo) => {

    const updatedTodo = { ...todo, status: todo.status === "completed" ? "pending" : "completed" }

    try {
      await updateTodoStatus(updatedTodo).unwrap()
      toast.success("Todo Status Changed Successfully")
    }
    catch (error) {
      toast.error("Failed to Update the todo status")
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
    try {
      await deleteTodo(id).unwrap()
      toast.success("Todo deleted Successfully")
    }
    catch (error) {
      toast.error(error?.data?.error || "Error While Deleting Todo")
    }

  }

  const validFilters = search || filterTag || filterPriority || status
  const filteredData = data?.filter((each) => {
    return (
      (!search || each.todo.toLowerCase().includes(search.toLowerCase())) &&
      (!filterTag || each.tag === filterTag) &&
      (!filterPriority || each.priority === filterPriority) &&
      (!status || each.status === status)
    );
  });

  if (isLoading) return <L8 style={{ height: "10rem", width: "10rem" }} />;

  return (
    <div style={{ background: "lavender" }} className="app-container">
      <TodosHeader />

      <div className='main-content'>
        <div className='confetti-container'>
          {showConfetti && <Confetti />}
        </div>

        <div className="todo-top-container">
          <div className="calendar-container">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>

          <form onSubmit={handleAddTask} id="form" className="form-container" >
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
              <option value="" hidden>Select One Tag</option>

              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}

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
            <button disabled={isLoading || !isValid} type="submit" className="login-button-form">
              Add Task
            </button>

          </form>
          <div className='filter-container'>
            <h1 className='filter-heading'>Use Filters to Organize Your Data <FcFilledFilter size={20} /></h1>
            <div className='filters-container'>
              <div className='input-wrapper'>
                <input required id='search' onChange={handleSearch} value={search} type="search" className='input-element' style={{ height: "50px" }} />
                <label htmlFor='search' className='label'>Search...</label>
              </div>

              <select
                id="filterTag"
                value={filterTag}
                onChange={handleFilterTag}
                className='input-element'
                style={{ color: 'black', backgroundColor: "lavender" }}

              >
                <option value="" hidden>Filter By Tag</option>
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>

              <select
                id="filterPriority"
                value={filterPriority}
                onChange={handleFilterPriority}
                className='input-element'
                style={{ color: 'black', backgroundColor: "lavender" }}
              >
                <option value="" hidden>Filter By Priority</option>
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
                <option value="" hidden>Filter By Status</option>
                <option value="pending">pending</option>
                <option value="completed">completed</option>

              </select>
              <button disabled={isLoading || !validFilters} onClick={handleRemoveFilters} className='remove-filters-button'>Remove Filters</button>
            </div>
          </div>
        </div>

        <h1 className="fetch-todos-heading">Fetching todos for: <span className="formatted-date-heading">{formattedDate}</span></h1>

        <div className='todo-data-container'>
          {filteredData?.length === 0 ?
            (<div className='no-todos-container'>
              <img className='todo-image-1' alt="todo" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749119752/no-todos-image_g38jaf.webp" />
              <div>
                <p className='no-todos-content'>No Todos for this Date: <span className="formatted-date-heading">{formattedDate}</span></p>
                <h3 style={{ fontWeight: "bold", color: "green" }}>Please Try to Add Tasks</h3>
              </div>
            </div>) : (filteredData.map((item) => (
              <div className='each-todo' key={item._id}>
                <input checked={item.status === "completed"} onChange={() => handleCheckboxStatus(item)} className="todo-checkbox" type="checkbox" />
                <p className='todo-display' >{item.todo}</p>
                <Popup onOpen={() => {
                  const todoToEdit = data.find(todo => todo._id === item._id);
                  if (todoToEdit) {
                    setEditTodo(todoToEdit.todo);
                    setEditTag(todoToEdit.tag);
                    setEditPriority(todoToEdit.priority);

                  }
                }} contentStyle={{
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
                  trigger={<button

                    className="icon" title="Edit Task" style={{ color: 'black' }}>
                    📝</button>}>

                  {close => (
                    <div className="update-todo-container">

                      <h1 className='update-heading'>Update Your Task</h1>

                      <form onSubmit={(e) => {
                        handleUpdateTask(e, item._id, close);

                      }} id="form" className="form-container" >
                        <div className='input-wrapper'>
                          <input required value={editTodo} onChange={(e) => setEditTodo(e.target.value)} id="task" className="input-element" type="text" />
                          <label htmlFor="task" className="label">
                            TASK
                          </label>
                        </div>
                        <select
                          name="tag"
                          value={editTag}
                          onChange={(e) => setEditTag(e.target.value)}
                          className='dropdown'
                          style={{ color: 'black', backgroundColor: "lavender" }}
                          id="tag"
                        >
                          <option value="" hidden>Select One Tag</option>
                          {tagOptions.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))}
                        </select>

                        <select
                          id="priority"
                          name="priority"
                          value={editPriority}
                          onChange={(e) => setEditPriority(e.target.value)}
                          className='dropdown'
                          style={{ color: 'black', backgroundColor: "lavender" }}
                        >
                          <option value="" hidden>Select Priority</option>
                          <option value="low">low</option>
                          <option value="medium">medium</option>
                          <option value="high">high</option>

                        </select>
                        <button disabled={isLoading || !validUpdate} type="submit" className="login-button-form">
                          UPDATE
                        </button>

                        <button style={{ textAlign: "center" }} onClick={() => { close(); }} className='login-button-form'>Close</button>

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

      <TodosFooter />
    </div>
  );
};

export default Todo;