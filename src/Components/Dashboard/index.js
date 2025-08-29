import Sidebar from "../Sidebar"
import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"

import { MainContainer, DashboardHeading, DashboardContent, DashboardGraphContainer } from "../../styles"
import { useMediaQuery } from "react-responsive"
import { useGetDashboardDataQuery } from "../../services/todoService"
import { useState } from "react"
import { PieChart, Pie, Tooltip, Cell, Legend, } from "recharts"
import { BarChart, CartesianGrid, Bar, XAxis, YAxis, Label, LabelList } from "recharts";
import {
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./index.css"
import AddTodoIcon from "../AddTodoIcon"
import { useSelector } from "react-redux"

const COLORS = ['purple', 'green', 'red'];


const Dashboard = () => {
    const auth = useSelector(state => state.auth)
    const { username } = auth
    const [range, setRange] = useState(6)
    const theme = useSelector(state => state.theme.theme)
    const { data, isFetching, isError, error } = useGetDashboardDataQuery({ days: range })

    const { status_breakdown, priority_breakdown, completion_trend, tag_breakdown, created_vs_completed_trend } = data || {}
    let stackedBarData = created_vs_completed_trend?.created_vs_completed_breakdown || []
    const maxStack = Math.max(...stackedBarData?.map(item => item.total))


    let tagData = tag_breakdown?.tags || []

    const maxTags = Math.max(...tagData?.map(item => item.count))

    const pieData = [
        { name: 'Total Tasks', value: status_breakdown?.totalTasks },
        { name: 'Completed Tasks', value: status_breakdown?.completedTasks },
        { name: 'Pending Tasks', value: status_breakdown?.pendingTasks },
    ];

    let newUser = status_breakdown?.totalTodos < 5

    const isSmallScreen = useMediaQuery({ maxWidth: 767 })

    const priorityData = [
        { name: isSmallScreen ? "High" : "High Priority", tasks: priority_breakdown?.high },
        { name: isSmallScreen ? "Medium" : "Medium Priority", tasks: priority_breakdown?.medium },
        { name: isSmallScreen ? "Low" : "Low Priority", tasks: priority_breakdown?.low },
    ]

    const lineChartData = completion_trend?.completion_breakdown || []
    let maxTick = Math.max(...lineChartData?.map(item => item.count))

    const lineChartWidth = Math.max(completion_trend?.completion_breakdown?.length * 50, 400)


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
    const upperLimitLineChart = Math.ceil(maxTick / step) * step

    const lineChartTicks = []
    for (let i = 0; i <= upperLimitLineChart; i += step) {
        lineChartTicks.push(i)

    }

    const stackTicks = []

    const stackUpperLimit = Math.ceil(maxStack / step) * step
    for (let i = 0; i <= stackUpperLimit; i += step) {
        stackTicks.push(i)
    }

    const tagTicks = []
    const tagUpperLimit = Math.ceil(maxTags / step) * step
    for (let i = 0; i <= tagUpperLimit; i += step) {
        tagTicks.push(i)
    }


    const dynamicWidth = Math.max(tagData?.length * 50, 400);
    const stackBarWitdh = Math.max(created_vs_completed_trend?.created_vs_completed_breakdown?.length * 50, 400)

    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <MainContainer bg={theme?.main?.bg}>
                <DashboardHeading color={theme?.colors?.dark}>Hey {username}, Welcome to Your Dashboard</DashboardHeading>
                <DashboardContent color={theme?.colors?.text}>Track your tasks and progress with ease using the charts below. Stay focused and organized!</DashboardContent>
                <div className="filter-range-container">
                    <DashboardHeading color={theme?.colors?.dark}>Select Date Range</DashboardHeading>
                    <select onChange={(e) => setRange(e.target.value)} value={range} className="date-dropdown">
                        <option default value="6">Last 7 Days</option>
                        <option value="29">Last Month</option>
                        <option value="89">Last 3 Months</option>
                        <option value="179"> Last 6 Months</option>
                        <option value="364">Last Year</option>
                    </select>
                </div>


                {isFetching ? (
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
                            newUser ? (<p className="new-user">You don’t have enough Tasks yet. Add some Tasks to enjoy these insights!</p>) :
                                (
                                    <div>
                                        <DashboardGraphContainer color={theme?.colors.primary} bg={theme?.main.cardBg}>
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
                                        </DashboardGraphContainer>
                                        <DashboardGraphContainer color={theme?.colors.primary} bg={theme?.main.cardBg}>
                                            <div className="chart-info">
                                                <h1 className="chart-title">Title: Task Priority Breakdown</h1>
                                                <h1 className="chart-description">Description: Overview of high, medium, and low priority tasks in the selected date range.</h1>
                                            </div>
                                            <BarChart margin={{ left: 0 }} width={width} height={height} data={priorityData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name"> <Label style={{
                                                    fill: 'blue',
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase'
                                                }} value="Priority Level" offset={0} position="insideBottom" /></XAxis>
                                                <YAxis ticks={ticks} >  <Label
                                                    style={{
                                                        fill: 'magenta',
                                                        fontSize: isSmallScreen ? 14 : 20,
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
                                                                entry.name === 'High Priority' || entry.name === "High"
                                                                    ? 'red'
                                                                    : entry.name === 'Medium Priority' || entry.name === "Medium"
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

                                        </DashboardGraphContainer>
                                        <DashboardGraphContainer color={theme?.colors.primary} bg={theme?.main.cardBg}>
                                            <div className="chart-info">
                                                <h1 className="chart-title">Title: Task Completion Trend</h1>
                                                <h1 className="chart-description">Description: Trend of tasks completed over time in the selected date range.</h1>
                                            </div>
                                            <div className="graph-container">
                                                <div style={{ minWidth: lineChartWidth }}>
                                                    <ResponsiveContainer width={lineChartWidth} height={height}>
                                                        <LineChart data={lineChartData}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="date" ><Label style={{
                                                                fill: 'blue',
                                                                fontSize: 14,
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase'
                                                            }} value="Selected Range" offset={-4} position="insideBottom" /></XAxis>
                                                            <YAxis ticks={lineChartTicks}><Label
                                                                style={{
                                                                    fill: 'magenta',
                                                                    fontSize: isSmallScreen ? 14 : 20,
                                                                    fontWeight: 'bold',
                                                                    textTransform: 'uppercase'
                                                                }}
                                                                value="Tasks Completed"
                                                                angle={-90}
                                                                position="insideMiddle"
                                                                offset={10}
                                                            /></YAxis>
                                                            <Tooltip />
                                                            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2}
                                                                dot={{ r: 4 }} > <LabelList dataKey="value" position="top" /></Line>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>

                                        </DashboardGraphContainer>
                                        <DashboardGraphContainer color={theme?.colors.primary} bg={theme?.main.cardBg}>
                                            <div className="chart-info">
                                                <h1 className="chart-title">Title: Daily Task Progress in Selected Range</h1>
                                                <h1 className="chart-description">Description: A stacked bar chart showing the total number of tasks and the portion completed for each day within the chosen date range. Visualize daily productivity and track completion trends over time.</h1>
                                            </div>
                                            <div className="graph-container">
                                                <div style={{ minWidth: stackBarWitdh }}>
                                                    <BarChart width={stackBarWitdh} height={height} data={stackedBarData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="date"> <Label style={{
                                                            fill: 'blue',
                                                            fontSize: 14,
                                                            fontWeight: 'bold',
                                                            textTransform: 'uppercase'
                                                        }} value="Selected Range" offset={0} position="insideBottom" /></XAxis>
                                                        <YAxis ticks={stackTicks} >  <Label
                                                            style={{
                                                                fill: 'magenta',
                                                                fontSize: isSmallScreen ? 14 : 20,
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase'
                                                            }}
                                                            value="Number of Tasks"
                                                            angle={-90}
                                                            position="insideMiddle"
                                                            offset={10}
                                                        /></YAxis>
                                                        <Bar fill="dodgerblue" radius={[0, 0, 0, 0]} dataKey="total">
                                                            <LabelList dataKey="value" position="top" />
                                                        </Bar>
                                                        <Bar fill="green" radius={[0, 0, 0, 0]} dataKey="completed">
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

                                        </DashboardGraphContainer>
                                        <DashboardGraphContainer color={theme?.colors.primary} bg={theme?.main.cardBg}>
                                            <div className="chart-info">
                                                <h1 className="chart-title">Title: Task Tag   Breakdown</h1>
                                                <h1 className="chart-description">Description:  Distribution of tasks grouped by tags, showing how many tasks belong to each tag within the selected date range.</h1>
                                            </div>
                                            <div className="graph-container">
                                                <div style={{ minWidth: dynamicWidth }}>
                                                    <BarChart width={dynamicWidth} height={height} data={tagData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="tag"> <Label style={{
                                                            fill: 'blue',
                                                            fontSize: 14,
                                                            fontWeight: 'bold',
                                                            textTransform: 'uppercase'
                                                        }} value="Tags" offset={0} position="insideBottom" /></XAxis>
                                                        <YAxis ticks={tagTicks} >  <Label
                                                            style={{
                                                                fill: 'magenta',
                                                                fontSize: isSmallScreen ? 14 : 20,
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase'
                                                            }}
                                                            value="Number of Tasks"
                                                            angle={-90}
                                                            position="insideMiddle"
                                                            offset={10}
                                                        /></YAxis>
                                                        <Bar radius={[10, 10, 0, 0]} dataKey="count">
                                                            {tagData.map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`} position="top"
                                                                    fill={
                                                                        'dodgerblue'
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

                                        </DashboardGraphContainer>

                                    </div>
                                )
                        )
                )
                }


            </MainContainer>
            <AddTodoIcon />
            <TodosFooter />
        </div>
    )
}

export default Dashboard;