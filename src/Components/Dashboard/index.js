import Sidebar from "../Sidebar"
import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import Cookies from "js-cookie"
import PiePage from "../PiePage"
import BarChartPage from "../BarChartPage"
import "./index.css"
import AddTodoIcon from "../AddTodoIcon"

const Dashboard = () => {
    const username = Cookies.get("username").toUpperCase()
    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <main className="main-container">
                <div className="dashboard-container">
                    <h3 className="under-working">
                        🚧 I’m working on this feature — it will be live on the website soon!
                    </h3>

                    <h1 className="dashboard-heading">Hey {username}, Welcome to Your Dashboard</h1>
                    <p className="dashboard-content">Track your tasks and progress with ease using the charts below. Stay focused and organized!</p>
                    <PiePage />
                    <BarChartPage />
                </div>
            </main>
            <AddTodoIcon />
            <TodosFooter />

        </div>
    )
}

export default Dashboard;