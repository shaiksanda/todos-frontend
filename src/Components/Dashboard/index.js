import Sidebar from "../Sidebar"
import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import Cookies from "js-cookie"
import { useMediaQuery } from "react-responsive"
import { useGetDashboardDataQuery } from "../../services/todoService"
import { useState } from "react"
import { PieChart, Pie, Tooltip, Cell, Legend, } from "recharts"
import { BarChart, Bar, XAxis, YAxis, Label, LabelList } from "recharts";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./index.css"
import AddTodoIcon from "../AddTodoIcon"

const COLORS = ['purple', 'greenyellow', 'red'];


const Dashboard = () => {
    const username = Cookies.get("username").toUpperCase()
    const [range, setRange] = useState("")
    const { data, isLoading, isError, error } = useGetDashboardDataQuery({ days: range })

    const { status_breakdown, priority_breakdown, } = data || {}
    //completion_trend, created_vs_completed_trend, tag_breakdown 
    const pieData = [
        { name: 'Total Tasks', value: status_breakdown?.totalTodos },
        { name: 'Completed Tasks', value: status_breakdown?.completedTodos },
        { name: 'Pending Tasks', value: status_breakdown?.pendingTodos },
    ];

    const isSmallScreen = useMediaQuery({ maxWidth: 767 })

    const priorityData = [
    { name: isSmallScreen?"High":"High Priority", tasks: priority_breakdown?.high },
        { name: isSmallScreen?"Medium":"Medium Priority", tasks: priority_breakdown?.medium },
        { name: isSmallScreen?"Low":"Low Priority", tasks: priority_breakdown?.low },
    ]

    
    const width = isSmallScreen ? 280 : 400
    const height = isSmallScreen ? 350 : 400

    let maxValue = Math.max(...priorityData?.map(item => item.tasks));
    maxValue += 1
    let step;
    if (maxValue <= 5) {
        step = 1
    }
    else if (maxValue <= 10) {
        step = 2
    }
    else if (maxValue <= 50) {
        step = 5
    }
    else if (maxValue <= 200) {
        step = 10
    }
    else {
        step = 20
    }
    const upperLimit = Math.ceil(maxValue / step) * step;

    const ticks = [];
    for (let i = 0; i <= upperLimit; i += step) {
        ticks.push(i);
    }



    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <main style={{ padding: '6px' }} className="main-container">
                <div className="dashboard-container">
                    <h1 className="dashboard-heading">Hey {username}, Welcome to Your Dashboard</h1>
                    <p className="dashboard-content">Track your tasks and progress with ease using the charts below. Stay focused and organized!</p>
                    <div className="filter-range-container">
                        <h1 className="select-date-range-heading">Select Date Range</h1>
                        <select onChange={(e) => setRange(e.target.value)} value={range} className="date-dropdown">
                            <option value="6">Last 7 Days</option>
                            <option value="29">Last Month</option>
                            <option value="89">Last 3 Months</option>
                            <option value="179"> Last 6 Months</option>
                            <option value="364">Last Year</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <div>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className='skeleton'>
                                    <Skeleton height={120} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        isError ? (
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
                        ) :
                            (
                                <div>
                                    <div className="status-pie-chart">
                                        <div className="chart-info">
                                            <h1 className="chart-title">Title: Task Status Breakdown</h1>
                                            <h1 className="chart-description">Description: Overview of total, completed, and pending tasks in the selected date range.</h1>
                                        </div>
                                        <PieChart width={width} height={height} className="pie-graph">
                                            <Pie
                                                data={pieData}
                                                activeShape={false}
                                                dataKey="value"

                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell name={entry.name} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend iconType="circle"
                                                layout="vertical"
                                                verticalAlign="bottom"
                                                marginTop={50} />
                                        </PieChart>
                                    </div>
                                    <div className="status-pie-chart">
                                        <div className="chart-info">
                                            <h1 className="chart-title">Title: Task Priority Breakdown</h1>
                                            <h1 className="chart-description">Description: Overview of high, medium, and low priority tasks in the selected date range.</h1>
                                        </div>
                                        <BarChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }} width={width} height={height} data={priorityData}>
                                            <XAxis dataKey="name"> <Label style={{
                                                fill: 'blue',
                                                fontSize: isSmallScreen?14:20,
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase'
                                            }} value="Priority Level" offset={-5} position="insideBottom" /></XAxis>
                                            <YAxis ticks={ticks} >  <Label
                                                style={{
                                                    fill: 'magenta',
                                                    fontSize: isSmallScreen?14:20,
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase'
                                                }}
                                                value="Number of Tasks"
                                                angle={-90}
                                                position="insideMiddle"
                                                offset={10}
                                            /></YAxis>
                                            <Bar radius={[10, 10, 0, 0]} dataKey="tasks">
                                                {priorityData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`} position="top"
                                                        fill={
                                                            entry.name === 'High Priority'|| entry.name==="High"
                                                                ? 'red'
                                                                : entry.name === 'Medium Priority'||entry.name=== "Medium"
                                                                    ? '#f1c40f'
                                                                    : '#2ecc71'
                                                        }
                                                    />
                                                ))}
                                                <LabelList dataKey="value" position="top" />
                                            </Bar>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'white',
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    color: '#333',
                                                }}
                                                cursor={false}
                                            />

                                        </BarChart>
                                    </div>
                                </div>


                            )
                    )
                    }

                </div>
            </main>
            <AddTodoIcon />
            <TodosFooter />

        </div>
    )
}

export default Dashboard;