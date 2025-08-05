import Sidebar from '../Sidebar';
import TodosHeader from '../TodosHeader';
import TodosFooter from '../TodosFooter';
import { MainContainer, EachGoal, GoalsButton, DashboardHeading, DashboardContent, Dropdown } from '../../styles';
import "./index.css"
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import { useDeleteFeedbackMutation, useAddFeedbackMutation, useGetFeedbacksQuery, useUpdateFeedbackMutation } from '../../services/todoService';
import { toast } from 'react-toastify';

const Feedback = () => {
  const theme = useSelector(state => state.theme.theme)
  const auth = useSelector(state => state.auth)

  
  const [addFeedback, { isLoading: addLoading }] = useAddFeedbackMutation()


  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  const [updateMessage, setUpdateMessage] = useState("")
  const [updateType, setUpdateType] = useState("")

  const [filterType, setFilterType] = useState("")
  const [status, setStatus] = useState("")

  const { data, isFetching, isError, error } = useGetFeedbacksQuery({ type: filterType, status })
  const [deleteFeedback,] = useDeleteFeedbackMutation()
  const [updateFeedback, { isLoading }] = useUpdateFeedbackMutation()

  const handleDeleteFeedback = async (id) => {
    try {
      await deleteFeedback(id).unwrap()
      toast.success("Feedback Deleted Successfully")
    }
    catch (err) {
      toast.error(err?.data?.error)
    }

  }

  const handleAddFeedback = async (e, close) => {
    e.preventDefault()
    try {
      await addFeedback({ message, type }).unwrap()
      toast.success("Feedback Added Successfully")
      setMessage("")
      setType('')
      close()

    }
    catch (err) {
      toast.error(err?.data?.error || err.message || "Something went wrong")
    }
  }

  const handleUpdate = async (close, id) => {
    try {

      await updateFeedback({ _id: id, message: updateMessage, type: updateType }).unwrap()
      toast.success("Feedback Updated Successfully")
      close()

    }
    catch (err) {
      toast.error(err?.data?.error)
    }

  }

  const handleStatus = async (id) => {
    try {
      await updateFeedback({ _id: id, status: "resolved" })
      toast.success("Feedback Is Resolved")
    }
    catch (err) {
      toast.error(err?.data?.error)
    }
  }

  const isValid = message && type
  return (
    <div>
      <TodosHeader />
      <Sidebar />
      <MainContainer bg={theme?.main?.bg}>
        <DashboardHeading color={theme?.colors.dark}>Share Your Feedback</DashboardHeading>
        <DashboardContent color={theme?.colors.primary}>We’d love to hear your thoughts about the app. Let us know what’s working well, what can be improved, or if you’ve found any issues.</DashboardContent>
        <DashboardContent color={theme?.colors.primary}>Use the dropdowns below to select the feedback type and status</DashboardContent>
        <div className='dropdown-container'>
          <Dropdown bg={theme?.colors.light} value={filterType} onChange={(e) => setFilterType(e.target.value)} >
            <option value="" default>Select Type</option>
            <option value="bug">Bug/Issue</option>
            <option value="suggestion">suggestion/improvement</option>
            <option value="feedback">feedback</option>
          </Dropdown>
          <Dropdown bg={theme?.colors.light} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" default>Select Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </Dropdown>
        </div>
        <DashboardHeading color={theme?.colors.dark}>All Feedbacks</DashboardHeading>
        {isFetching ?
          (<div className='todo-grid-container'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='skeleton'>
                <Skeleton height={120} />
              </div>
            ))}
          </div>)
          : (
            isError ? (
              <div className='error-msg'>
                <p>
                  {error?.data?.message || error?.error || "Something went wrong. Please try again."}
                </p>
                {error?.status === "FETCH_ERROR" && (
                  <p style={{ color: "red", fontWeight: 600 }}>
                    Server seems unreachable. Check your internet connection or try again later.
                  </p>
                )}
              </div>) : (data?.feedbacks.length === 0 ? (
                <div className='no-todos-container'>
                  <img
                    className='todo-image-1'
                    alt="todo"
                    src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1754292082/Screenshot_2025-08-04_125033_ebyqfc.webp"
                  />
                  <div>
                    <p style={{ color: 'red' }} className='no-todos-content'>No Feedbacks
                    </p>
                    <h3 style={{ fontWeight: "bold", color: "red" }}>Please Try to Add Your Feedbacks</h3>
                  </div>
                </div>) :
                (<div className="todo-grid-container">
                  {data?.feedbacks?.map(each => (
                    <EachGoal bg={theme?.colors.dark} key={each._id}>
                      <h2>Created By: {each.userId.username}</h2>
                      <h2>{each.type}: {each.message}</h2>
                      {(each.type === "bug" || each.type==="suggestion") && (<h2>Status: {each.status}</h2>)}

                      <div className="goals-btns">
                        <Popup
                          onOpen={() => {
                            const feedbackToEdit = data?.feedbacks?.find(feedback => feedback._id === each._id);
                            if (feedbackToEdit) {
                              setUpdateMessage(feedbackToEdit.message)
                              setUpdateType(feedbackToEdit.type)
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
                            <button className="goal-btn" title="Edit Task" >
                              Update Feedback
                            </button>
                          }
                        >
                          {close => (
                            <div className="update-todo-container">
                              <h1 className='update-heading'>Update Your Goal</h1>
                              <form

                                id="form"
                                className="todo-form-container"
                              >
                                <div className='input-wrapper'>
                                  <input
                                    required
                                    value={updateMessage}
                                    onChange={(e) => setUpdateMessage(e.target.value)}

                                    id="task"
                                    className="input-element"
                                    type="text"
                                  />
                                  <label htmlFor="task" className="label">Message</label>
                                </div>
                                <select onChange={(e) => setUpdateType(e.target.value)} value={updateType} className='dropdown edit-mode'
                                  style={{ color: 'black', backgroundColor: "lavender" }}  >
                                  <option value="" default>Select Type</option>
                                  <option value="bug">Bug/Issue</option>
                                  <option value="suggestion">suggestion/improvement</option>
                                  <option value="feedback">feedback</option>
                                </select>




                                <button
                                  onClick={() => handleUpdate(close, each._id)}
                                  disabled={isLoading}
                                  type="submit"
                                  className="login-button-form btn"
                                >
                                  {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
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
                        <button onClick={() => handleDeleteFeedback(each._id)} style={{ color: "red" }} className="goal-btn">Delete Feedback</button >
                      </div>
                      <div>
                        {
                          (each.type === "bug" || each.type==="suggestion") && ((auth.role === "admin" && each.status!=="resolved") && (
                            <button onClick={() => handleStatus(each._id)}

                              className="mark-as-complete"
                            >
                              Mark As Resolved
                            </button>
                          ))
                        }


                      </div>

                    </EachGoal>
                  ))}
                </div>))
          )}
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
                <GoalsButton color={theme?.colors.bg} bg={theme?.colors.primary}>Add Feedback</GoalsButton>
              </div>
            }>
            {close => (
              <form onSubmit={(e) => handleAddFeedback(e, close)} className="todo-form-container" >
                <h1 style={{ margin: "0px", color: "black" }} className='create-task-heading'>Share Feedback</h1>

                <div className='input-wrapper'>
                  <input onChange={(e) => setMessage(e.target.value)} value={message} required id="task" className="input-element" type="text" />
                  <label htmlFor="task" className="label">
                    Message
                  </label>
                </div>

                <select onChange={(e) => setType(e.target.value)} value={type} className='dropdown edit-mode'
                  style={{ color: 'magenta' }}>
                  <option value="" default>Select Type</option>
                  <option value="bug">Bug/Issue</option>
                  <option value="suggestion">suggestion/improvement</option>
                  <option value="feedback">feedback</option>
                </select>

                <button disabled={addLoading || !isValid} type="submit" className="login-button-form">
                  {addLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                    Processing...
                    <ClipLoader color="#007bff" size={20} />
                  </span>) : ("Add Feedback")}
                </button>
                <button style={{ backgroundColor: "black", width: "100%", marginTop: "10px" }} className='close-button' onClick={close}>Close</button>

              </form>
            )}
          </Popup>
        </div>

      </MainContainer>

      <TodosFooter />
    </div>
  )
}

export default Feedback
