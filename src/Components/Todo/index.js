import { useState, useEffect, } from 'react';

import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import AddTodoIcon from '../AddTodoIcon';
import ClipLoader from "react-spinners/ClipLoader";
import Confetti from 'react-confetti';
import { useMediaQuery } from 'react-responsive';

import { toast } from 'react-toastify';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import "./index.css"
import { useUpdateTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoStatusMutation } from '../../services/todoService';
const tagOptions = ["Work", "Coding Practice", "Revision", "Learning", "English Speaking Practice", "Entertainment", "Family", "Finance",
  "Fitness", "Groceries", "Health", "Hobbies", "Household", "Maintenance",
  "Personal", "Shopping", "Spiritual", "Travel"]
const Todo = () => {

  //used for filtering the data
  const [filterTag, setFilterTag] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  //search based filtering happens on the frontend
  const [search, setSearch] = useState('');

  //for updating the todo
  const [editTodo, setEditTodo] = useState("")
  const [editTag, setEditTag] = useState("")
  const [editPriority, setEditPriority] = useState("")
  const [editSelectedDate, setEditSelectedDate] = useState("")

  //these are api calling hooks from rtk query for network calls
  const { data, isLoading, error, isError } = useGetTodosQuery({ tag: filterTag, status: filterStatus, priority: filterPriority, selectedDate: selectedDate.toISOString().split('T')[0] })
  const [deleteTodo] = useDeleteTodoMutation()
  const [updateTodoStatus] = useUpdateTodoStatusMutation()
  const [updateTodo,{isLoading:updateLoading} ] = useUpdateTodoMutation()

  const validUpdate = editTodo && editPriority && editTag && editSelectedDate

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

    const updatedTodo = { todo: editTodo, tag: editTag, priority: editPriority, selectedDate: editSelectedDate }

    try {
      await updateTodo({ id, ...updatedTodo }).unwrap()
      toast.success("Todo Updated Successfully")
      close()
    }
    catch (error) {
      toast.error(error?.data?.message || "Failed to Update Todo")
    }
  }

  const handleRemoveFilters = () => {
    setFilterTag("")
    setFilterPriority("")
    setSearch("")
    setFilterStatus("")
    setSelectedDate(new Date())
  }

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

  const formattedDate = `${selectedDate.toLocaleString('default', { weekday: 'long' })}, ${selectedDate.getDate()} ${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}`;

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id).unwrap()
      toast.success("Todo deleted Successfully")
    }
    catch (error) {
      toast.error(error?.data?.error || "Error While Deleting Todo")
    }

  }

  const validFilters = search || filterTag || filterPriority || filterStatus
  const filteredData = (data || [])?.filter((each) => (!search || each.todo.toLowerCase().includes(search.toLowerCase()))
  );

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const skeletonCount = isSmallScreen ? 3 : 6



  return (
    <div>
      <TodosHeader />
      <div className='confetti-container'>
        {showConfetti && <Confetti />}
      </div>
      <Sidebar />
      <main className="main-container">
        <div className='filter-container'>
          <h1 className='filter-heading'>Use Filters to Organize Your Data </h1>
          <div className='filters-container all-todos'>
            <div style={{ width: "100%" }} className='input-wrapper'>
              <input required onChange={handleSearch} value={search} id="search" type="search" className='input-element' />
              <label htmlFor='search' className='label'>Search...</label>
            </div>

            <select
              id="filterTag"
              value={filterTag}
              onChange={handleFilterTag}
              className='todo-input input-element'
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
              className='todo-input input-element'
              style={{ color: 'black', backgroundColor: "lavender" }}
            >
              <option value="" hidden>Filter By Priority</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='todo-input input-element'
              style={{ color: 'black', backgroundColor: "lavender" }}
              id='status'
            >
              <option value="" hidden>Filter By Status</option>
              <option value="pending">pending</option>
              <option value="completed">completed</option>

            </select>

            <div className='date-wrapper'>
              <input onChange={(e) => setSelectedDate(new Date(e.target.value))} value={selectedDate.toISOString().split("T")[0]}
                required className='date-element' id="date" type="date" />
            </div>

            <button disabled={isLoading || !validFilters} onClick={handleRemoveFilters} className='remove-filters-button'>Remove Filters</button>

          </div>
        </div>

        <h1 className="fetch-todos-heading">Fetching todos for: <span className="formatted-date-heading">{formattedDate}</span></h1>
        <div>
          {isLoading ? (
            <div className='todo-grid-container'>
              {[...Array(skeletonCount)].map((_, i) => (
                <div key={i} className='skeleton'>
                  <Skeleton height={120} />
                </div>
              ))}
            </div>
          ) : isError ? (<div className='error-msg'>
            <p>
              {error?.data?.message || error?.error || "Something went wrong. Please try again."}
            </p>
            {error?.status === "FETCH_ERROR" && (
              <p style={{ color: "orange", fontWeight: 600 }}>
                Server seems unreachable. Check your internet connection or try again later.
              </p>
            )}
          </div>) : (filteredData?.length === 0 ? (
            <div className='no-todos-container'>
              <img
                className='todo-image-1'
                alt="todo"
                src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749119752/no-todos-image_g38jaf.webp"
              />
              <div>
                <p className='no-todos-content'>
                  No Todos for this Date: <span className="formatted-date-heading">{formattedDate}</span>
                </p>
                <h3 style={{ fontWeight: "bold", color: "green" }}>Please Try to Add Tasks</h3>
              </div>
            </div>
          ) : (
            <div className='todo-grid-container'>
              {filteredData.map((item) => (
                <div className='each-todo' key={item._id}>
                  <input
                    checked={item.status === "completed"}
                    onChange={() => handleCheckboxStatus(item)}
                    className="todo-checkbox"
                    type="checkbox"
                  />
                  <p className='todo-display'>{item.todo}</p>
                  <Popup
                    onOpen={() => {
                      const todoToEdit = data.find(todo => todo._id === item._id);
                      if (todoToEdit) {
                        setEditTodo(todoToEdit.todo);
                        setEditTag(todoToEdit.tag);
                        setEditPriority(todoToEdit.priority);
                        setEditSelectedDate(todoToEdit.selectedDate.split("T")[0])
                      }
                    }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      width: '90%',
                      maxWidth: '400px',
                      marginTop: "60px",
                      zIndex: '2500'
                    }}
                    className='popup-content'
                    position="right center"
                    modal
                    trigger={
                      <button className="icon" title="Edit Task" style={{ color: 'black' }}>
                        📝
                      </button>
                    }
                  >
                    {close => (
                      <div className="update-todo-container">
                        <h1 className='update-heading'>Update Your Task</h1>
                        <form
                          onSubmit={(e) => handleUpdateTask(e, item._id, close)}
                          id="form"
                          className="todo-form-container"
                        >
                          <div className='input-wrapper'>
                            <input
                              required
                              value={editTodo}
                              onChange={(e) => setEditTodo(e.target.value)}
                              id="task"
                              className="input-element"
                              type="text"
                            />
                            <label htmlFor="task" className="label">TASK</label>
                          </div>
                          <select
                            name="tag"
                            value={editTag}
                            onChange={(e) => setEditTag(e.target.value)}
                            className='dropdown edit-mode'
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
                            className='dropdown edit-mode'
                            style={{ color: 'black', backgroundColor: "lavender" }}
                          >
                            <option value="" hidden>Select Priority</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                          </select>
                          <div className='update-date-wrapper edit-mode'>
                            <label className='date-label' htmlFor="date">Update Date</label>
                            <input style={{ color: "magenta", fontWeight: "600" }} value={editSelectedDate} onChange={(e) => setEditSelectedDate(e.target.value)} required className='date-element' id="date" type="date" />
                          </div>
                          <button
                            disabled={updateLoading || !validUpdate}
                            type="submit"
                            className="login-button-form btn"
                          >
                            {updateLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                              Processing...
                              <ClipLoader color="#007bff" size={15} />
                            </span>) : ("Update")}
                          </button>
                          <button
                            style={{ textAlign: "center" }}
                            onClick={() => { close(); }}
                            className='login-button-form'
                          >
                            Close
                          </button>
                        </form>
                      </div>
                    )}
                  </Popup>
                  <button
                    onClick={() => handleDeleteTodo(item._id)}
                    className="icon"
                    title="Delete Task"
                    style={{ color: 'red' }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ))
          }
        </div>

      </main>
      <AddTodoIcon />
      <TodosFooter />
    </div>
  );
};

export default Todo;
