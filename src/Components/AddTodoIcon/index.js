
import { useMediaQuery } from 'react-responsive';
import { useAddTodoMutation } from '../../services/todoService';
import { toast } from 'react-toastify';
import { FaSeedling } from "react-icons/fa6";
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import "./index.css"

const tagOptions = ["Work", "Coding Practice", "Revision", "Learning", "English Speaking Practice", "Entertainment", "Family", "Finance",
    "Fitness", "Groceries", "Health", "Hobbies", "Household", "Maintenance",
    "Personal", "Shopping", "Spiritual", "Travel"]

const AddTodoIcon = () => {

    const [addTodoDate, setAddTodoDate] = useState(new Date())
    const [addTag, setAddTag] = useState('');
    const [addPriority, setAddPriority] = useState('');
    const [todo, setTodo] = useState('');



    const [addTodo, { isLoading }] = useAddTodoMutation()

    const handleTodoChange = (e) => setTodo(e.target.value);
    const handleTagChange = (e) => setAddTag(e.target.value);
    const handlePriorityChange = (e) => setAddPriority(e.target.value);


    const handleAddTask = async (event, close) => {
        event.preventDefault();
        if (!addTag || !addPriority || !todo) {
            toast.error("Please fill out all required fields!");
            return;
        }
        try {
            const formattedDate = addTodoDate.toISOString().split('T')[0];
            const newTodo = { todo, tag: addTag, priority: addPriority, selectedDate: formattedDate };

            await addTodo(newTodo).unwrap();
            toast.success("Task added successfully!");
            setAddTag("")
            setTodo("")
            setAddTodoDate(new Date());
            setAddPriority("")
            close()


        }
        catch (error) {
            toast.error(error?.data?.message || "Failed to Add Task")
        }
    };

    const isValid = addTag && todo && addPriority

    const isSmallScreen = useMediaQuery({ maxWidth: 767 })
    const size = isSmallScreen ? 50 : 60

    return (

        <div className='floating-plus-btn'>
            <Popup
                contentStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    width: '90%', // Full width for small devices
                    maxWidth: '400px', // Optional: Limit max width for larger devices


                }}
                position="right center" modal trigger={
                    <div>
                        <button type="button" className='icon plus-icon' >
                            <FaSeedling size={size} color="black" />
                        </button>
                    </div>
                }>
                {close => (
                    <form onSubmit={(e) => handleAddTask(e, close)} id="form" className="todo-form-container" >
                        <h1 style={{ margin: "0px", color: "black" }} className='create-task-heading'>Create A Task</h1>

                        <div className='input-wrapper'>
                            <input required value={todo} onChange={handleTodoChange} id="task" className="input-element" type="text" />
                            <label htmlFor="task" className="label">
                                TASK
                            </label>
                        </div>

                        <select
                            name="tag"
                            value={addTag}
                            onChange={handleTagChange}
                            className='dropdown edit-mode'
                            style={{ color: 'magenta' }}
                            id="tag"
                        >
                            <option value="default" hidden>Select One Tag</option>

                            {tagOptions.map((tag) => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}

                        </select>

                        <select
                            id="priority"
                            name="priority"
                            value={addPriority}
                            onChange={handlePriorityChange}
                            className='dropdown edit-mode'
                            style={{ color: 'magenta' }}
                        >
                            <option value="default" hidden>Select PRIORITY</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>

                        </select>

                        <div style={{ backgroundColor: "white" }} className='add-date-wrapper edit-mode'>
                            <label className="date-label" htmlFor="date">Pick Date</label>
                            <input onChange={(e) => setAddTodoDate(new Date(e.target.value))} value={addTodoDate.toISOString().split("T")[0]} required className='add-date-element' id="date" type="date" />
                        </div>
                        <button disabled={isLoading || !isValid} type="submit" className="login-button-form">
                            {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                                Processing...
                                <ClipLoader color="#007bff" size={20} />
                            </span>) : ("Add Task")}
                        </button>
                        <button style={{ backgroundColor: "black", width: "100%", marginTop: "10px" }} className='close-button' onClick={close}>Close</button>

                    </form>
                )}
            </Popup>
        </div>

    )
}

export default AddTodoIcon
