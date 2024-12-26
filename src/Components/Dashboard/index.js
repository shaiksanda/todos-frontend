
import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import Cookies from "js-cookie"
import PiePage from "../PiePage"
import BarChartPage from "../BarChartPage"
import "./index.css"

const Dashboard = () => {
    const username=Cookies.get("username").toUpperCase()
    return (
        <div>
            <TodosHeader />
            <div className="dashboard-container">
                <h1 className="dashboard-heading">Hey {username}, Welcome to Your Dashboard</h1>
                <p className="dashboard-content">Track your tasks and progress with ease using the charts below. Stay focused and organized!</p>
                <PiePage />
                <BarChartPage />
            </div>
            <TodosFooter />
            
        </div>
    )
}

export default Dashboard;