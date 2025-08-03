import Sidebar from "../Sidebar"
import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import { MainContainer, DashboardHeading, DashboardContent, GoalsButton, Dropdown, EachGoal } from "../../styles"
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

import "./index.css"
import { useSelector } from "react-redux"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useState } from "react"
import { useAddGoalMutation, useDeleteGoalMutation, useGetGoalsQuery, useUpdateGoalMutation } from "../../services/todoService"

const Goals = () => {
    const theme = useSelector(state => state.theme.theme)


    const [title, setTitle] = useState("")
    const [monthly, setMonthly] = useState(false)
    const [quarterly, setQuarterly] = useState(false)
    const [yearly, setYearly] = useState(false)

    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [quarter, setQuarter] = useState("")


    const [addMonth, setAddMonth] = useState("")
    const [addYear, setAddYear] = useState("")
    const [addQuarter, setAddQuarter] = useState("")

    const [addActiveType, setAddActiveType] = useState("")
    const [activeType, setActiveType] = useState("");
    const [deleteGoal] = useDeleteGoalMutation()
    const [updateGoal] = useUpdateGoalMutation()
    const [addGoal, { isLoading }] = useAddGoalMutation()
    const { data, isFetching, isError, error } = useGetGoalsQuery({ type: activeType, month, year, quarter })


    const handleMonthly = () => {
        setMonthly(true)
        setActiveType("monthly")
        setQuarterly(false)
        setYearly(false)

    }
    const handleQuarterly = () => {
        setQuarterly(true)
        setActiveType("quarterly")
        setMonthly(false)
        setYearly(false)
    }
    const handleYearly = () => {
        setYearly(true)
        setActiveType('yearly')
        setMonthly(false)
        setQuarterly(false)
    }
    const handleAll = () => {
        setActiveType("")
        setMonthly(false)
        setYearly(false)
        setQuarterly(false)
    }
    const getFilterMessage = () => {
        switch (activeType) {
            case "monthly":
                return "Use the dropdowns below to filter your Monthly Goals.";
            case "quarterly":
                return "Use the dropdowns below to filter your Quarterly Goals.";
            case "yearly":
                return "Use the dropdowns below to filter your Yearly Goals.";
            default:
                return "All your goals are visible below. Use the filters above to view specific types.";
        }
    };

    const handleTypeChange = (e) => {
        setAddActiveType(e.target.value)
    }

    const handleDeleteGoal = async (id) => {
        try {
            await deleteGoal(id).unwrap()
            toast.success("Goal Deleted Successfully")
        }
        catch (error) {
            toast.error(toast.error(error?.data?.error || "Error While Deleting Todo"))
        }


    }

    const handleUpdateGoal = async (id) => {

    }

    const handleStatus = async (id) => {

        try {
            await updateGoal({ _id: id, isCompleted: true }).unwrap()
            toast.success("Goal Successfully Completed")
        }
        catch (err) {
            toast.error(err)
        }
    }

    const handleAddGoal = async (e, close) => {
        e.preventDefault()
        let timeframe = {}
        if (addMonth) {
            timeframe.month = addMonth
        }
        if (addQuarter) {
            timeframe.quarter = addQuarter
        }
        if (addYear) {
            timeframe.year = addYear
        }
        const goalData = {
            title, type: addActiveType,
            timeframe

        }

        try {
            await addGoal(goalData).unwrap()
            toast.success("Goal Added Successfully")
            setTitle("")
            setAddMonth("")
            setAddQuarter("")
            setAddYear("")
            setAddActiveType("")
            close()

        }
        catch (error) {
            toast.error("Failed To Add Goal", error)
        }


    }

    const isValid = () => {
        if (!title || !addActiveType) return false;

        switch (addActiveType) {
            case "monthly":
                return addMonth !== "" && addYear !== "";
            case "quarterly":
                return addQuarter !== "" && addYear !== "";
            case "yearly":
                return addYear !== "";
            default:
                return false;
        }
    };

    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <MainContainer bg={theme?.main?.bg}>
                <DashboardHeading color={theme?.colors.dark}>Stay On Track With Your Goals</DashboardHeading>
                <DashboardContent color={theme?.colors?.text}>
                    Set, track, and achieve your personal goals. Whether it's monthly milestones, quarterly progress, or yearly ambitions — this page helps you stay focused and measure your success.
                </DashboardContent>
                <DashboardContent color={theme?.colors?.text}>
                    Every great achievement begins with a clear goal.
                </DashboardContent>
                <div className="goals-btns-container">
                    <GoalsButton onClick={handleAll} color={activeType !== "" && theme?.colors.primary} bg={activeType === "" ? theme?.colors.primary : "lavender"}>All</GoalsButton>
                    <GoalsButton onClick={handleMonthly} color={activeType !== "monthly" && theme?.colors.primary} bg={activeType === "monthly" ? theme?.colors.primary : "lavender"}>Monthly</GoalsButton>
                    <GoalsButton onClick={handleQuarterly} color={activeType !== "quarterly" && theme?.colors.primary} bg={activeType === "quarterly" ? theme?.colors.primary : "lavender"}>Quarterly</GoalsButton>
                    <GoalsButton onClick={handleYearly} color={activeType !== "yearly" && theme?.colors.primary} bg={activeType === "yearly" ? theme?.colors.primary : "lavender"}>Yearly</GoalsButton>
                </div>
                <DashboardHeading color={theme?.colors.dark}>{getFilterMessage()}</DashboardHeading>


                {monthly && (
                    <div className="dropdown-container">
                        <Dropdown onChange={(e) => setMonth(e.target.value)} bg={theme?.colors.light} value={month}>
                            <option value="">Select Month</option>
                            <option value={1}>Jan</option>
                            <option value={2}>Feb</option>
                            <option value={3}>Mar</option>
                            <option value={4}>Apr</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>Aug</option>
                            <option value={9}>Sep</option>
                            <option value={10}>Oct</option>
                            <option value={11}>Nov</option>
                            <option value={12}>Dec</option>
                        </Dropdown>
                        <Dropdown value={year} onChange={(e) => setYear(e.target.value)} bg={theme?.colors.light} name="" id="">
                            <option value="">Select year</option>
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                            <option value={2027}>2027</option>
                            <option value={2028}>2028</option>
                            <option value={2029}>2029</option>
                            <option value={2030}>2030</option>
                        </Dropdown>
                    </div>)}

                {quarterly && (
                    <div className="dropdown-container">
                        <Dropdown bg={theme?.colors.light} value={quarter} onChange={(e) => setQuarter(e.target.value)}>
                            <option value="">Selcet Quarter</option>
                            <option value={1}>Jan-Mar</option>
                            <option value={2}>Apr-Jun</option>
                            <option value={3}>July-Sep</option>
                            <option value={4}>Oct-Dec</option>
                        </Dropdown>
                        <Dropdown bg={theme?.colors.light} value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Select year</option>
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                            <option value={2027}>2027</option>
                            <option value={2028}>2028</option>
                            <option value={2029}>2029</option>
                            <option value={2030}>2030</option>
                        </Dropdown>
                    </div>
                )}

                {yearly && (
                    <div className="dropdown-container">
                        <Dropdown bg={theme?.colors.light} value={year} onChange={(e) => setYear(e.target.value)} >
                            <option value="">Select year</option>
                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                            <option value={2027}>2027</option>
                            <option value={2028}>2028</option>
                            <option value={2029}>2029</option>
                            <option value={2030}>2030</option>
                        </Dropdown>
                    </div>
                )}

                {isFetching ? (<div className='todo-grid-container'>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className='skeleton'>
                            <Skeleton height={120} />
                        </div>
                    ))}
                </div>) : (
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
                        </div>
                    ) :
                        (
                            data?.goals.length === 0 ? (
                                <div className='no-todos-container'>
                                    <img
                                        className='todo-image-1'
                                        alt="todo"
                                        src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1754128901/Screenshot_2025-08-02_152828_pucjkf.webp"
                                    />
                                    <div>
                                        <p style={{ color: 'red' }} className='no-todos-content'>No Goals
                                        </p>
                                        <h3 style={{ fontWeight: "bold", color: "red" }}>Please Try to Add Goals</h3>
                                    </div>
                                </div>
                            ) : (
                                <div className="todo-grid-container">
                                    {data?.goals?.map(each => (
                                        <EachGoal bg={theme?.colors.dark} key={each._id}>
                                            <h1>Goal: {each.title}</h1>

                                            <div className="goals-btns">
                                                <button onClick={() => handleUpdateGoal(each._id)} className="goal-btn">Update Goal</button>
                                                <button onClick={() => handleDeleteGoal(each._id)} style={{ color: "red" }} className="goal-btn">Delete Goal</button >
                                            </div>
                                            <div>
                                                {
                                                    !each.isCompleted && (
                                                        <button
                                                            onClick={() => handleStatus(each._id)}
                                                            className="mark-as-complete"
                                                        >
                                                            Mark as Completed
                                                        </button>
                                                    )
                                                }
                                                {
                                                    each.isCompleted && (
                                                        <h1 className="completed-label">✔ Marked As Complete</h1>
                                                    )
                                                }

                                            </div>

                                        </EachGoal>
                                    ))}
                                </div>)
                        )
                )
                }
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
                                <GoalsButton color={theme?.colors.bg} bg={theme?.colors.primary}>Add Goal</GoalsButton>
                            </div>
                        }>
                        {close => (
                            <form onSubmit={(e) => handleAddGoal(e, close)} id="form" className="todo-form-container" >
                                <h1 style={{ margin: "0px", color: "black" }} className='create-task-heading'>Create A Goal</h1>

                                <div className='input-wrapper'>
                                    <input onChange={(e) => setTitle(e.target.value)} value={title} required id="task" className="input-element" type="text" />
                                    <label htmlFor="task" className="label">
                                        Title
                                    </label>
                                </div>

                                <select
                                    name="tag"
                                    className='dropdown edit-mode'
                                    style={{ color: 'magenta' }}
                                    id="tag"
                                    onChange={handleTypeChange}
                                >
                                    <option value="default" hidden>Select Type</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>

                                {addActiveType === "monthly" && (
                                    <div>
                                        <select value={addMonth}
                                            onChange={(e) => setAddMonth(e.target.value)} className='dropdown'
                                            style={{ color: 'magenta' }} name="" id="">
                                            <option value="deafult" hidden>Select Month</option>
                                            <option value={1}>Jan</option>
                                            <option value={2}>Feb</option>
                                            <option value={3}>Mar</option>
                                            <option value={4}>Apr</option>
                                            <option value={5}>May</option>
                                            <option value={6}>June</option>
                                            <option value={7}>July</option>
                                            <option value={8}>Aug</option>
                                            <option value={9}>Sep</option>
                                            <option value={10}>Oct</option>
                                            <option value={11}>Nov</option>
                                            <option value={12}>Dec</option>
                                        </select>
                                        < select value={addYear}
                                            onChange={(e) => setAddYear(e.target.value)} className='dropdown edit-mode'
                                            style={{ color: 'magenta' }} name="" id="">
                                            <option value="default" hidden>Select year</option>
                                            <option value={2025}>2025</option>
                                            <option value={2026}>2026</option>
                                            <option value={2027}>2027</option>
                                            <option value={2028}>2028</option>
                                            <option value={2029}>2029</option>
                                            <option value={2030}>2030</option>
                                        </select>
                                    </div>
                                )}

                                {addActiveType === "quarterly" && (
                                    <div>
                                        <select value={addQuarter}
                                            onChange={(e) => setAddQuarter(e.target.value)} className='dropdown edit-mode'
                                            style={{ color: 'magenta' }} name="" id="">
                                            <option value="default" hidden>Selcet Quarter</option>
                                            <option value={1}>Jan-Mar</option>
                                            <option value={2}>Apr-Jun</option>
                                            <option value={3}>July-Sep</option>
                                            <option value={4}>Oct-Dec</option>
                                        </select>
                                        <select value={addYear}
                                            onChange={(e) => setAddYear(e.target.value)} className='dropdown edit-mode'
                                            style={{ color: 'magenta' }} name="" id="">
                                            <option value="default" hidden>Select year</option>
                                            <option value={2025}>2025</option>
                                            <option value={2026}>2026</option>
                                            <option value={2027}>2027</option>
                                            <option value={2028}>2028</option>
                                            <option value={2029}>2029</option>
                                            <option value={2030}>2030</option>
                                        </select>
                                    </div>
                                )}
                                {addActiveType === "yearly" && (
                                    < select value={addYear}
                                        onChange={(e) => setAddYear(e.target.value)} className='dropdown edit-mode'
                                        style={{ color: 'magenta' }} name="" id="">
                                        <option value="default" hidden>Select year</option>
                                        <option value={2025}>2025</option>
                                        <option value={2026}>2026</option>
                                        <option value={2027}>2027</option>
                                        <option value={2028}>2028</option>
                                        <option value={2029}>2029</option>
                                        <option value={2030}>2030</option>
                                    </select>
                                )}


                                <button disabled={isLoading || !isValid()} type="submit" className="login-button-form">
                                    {isLoading ? (<span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                                        Processing...
                                        <ClipLoader color="#007bff" size={20} />
                                    </span>) : ("Add Goal")}
                                </button>
                                <button style={{ backgroundColor: "black", width: "100%", marginTop: "10px" }} className='close-button' onClick={close}>Close</button>

                            </form>
                        )}
                    </Popup>
                </div>


            </MainContainer >

            <TodosFooter />
        </div >
    )
}

export default Goals
