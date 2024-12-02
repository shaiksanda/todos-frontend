import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FcHome } from "react-icons/fc";
import './index.css';

const TodosFooter = () => {
    return (
        <div className='todo-footer-container'>
            <div className="icon-container">
                <Link to="/todo"><FcHome size={25} /></Link>
                <Link to="/todo" className='remove-styling'><p className="icon-content">Home</p></Link>
            </div>
            <div className="icon-container">
                <Link to="/dashboard"><MdDashboard size={25} /></Link>
                <Link to="/dashboard" className='remove-styling' ><p className="icon-content">Dashboard</p></Link>
            </div>

        </div>
    );
};

export default TodosFooter;
