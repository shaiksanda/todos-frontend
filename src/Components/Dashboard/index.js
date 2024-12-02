
import TodosHeader from "../TodosHeader"
import "./index.css"

const Dashboard = () => {
    console.log("")
    return (
        <div>
            <TodosHeader />
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <h2>Welcome to your dashboard!</h2>
            </div>
            
        </div>
    )
}

export default Dashboard;