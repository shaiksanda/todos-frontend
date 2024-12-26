import { AiFillHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import "./index.css"
const TodosFooter=()=>{
    console.log()
    return (
        <div className="footer">
            
            <div className="navigation-container">
                <Link to="/todo"><AiFillHome style={{color:"black"}} size={25} /></Link>
                <Link to="/todo"><p style={{color:"black"}} className="navigation-content">Home</p></Link>
            </div>
            <div className="navigation-container">
                <Link className="remove-styling" to="/dashboard"><MdDashboard style={{color:"black"}} size={25} /></Link>
                <Link className="remove-styling" to="/dashboard"><p style={{color:"black"}} className="navigation-content">Dashboard</p></Link>
            </div>
        </div>
    )
}

export default TodosFooter;