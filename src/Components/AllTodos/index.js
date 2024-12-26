import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import "./index.css"

const AllTodos=()=>{
    console.log()
    return (
        <div>
            <TodosHeader />
            <div className="all-todos-container">
                <p style={{textAlign:"center"}}>This feature is coming soon! Stay tuned for updates—we can’t wait to share it with you</p>
            </div>
            <TodosFooter />
        </div>
    )
}

export default AllTodos