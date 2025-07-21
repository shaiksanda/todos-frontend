import { IoMdHome } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaAffiliatetheme } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import TodosHeader from "../TodosHeader"
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndex } from "../../features/selectedSlice";
import { useNavigate } from "react-router-dom";
import "./index.css"
import TodosFooter from "../TodosFooter";

const sidebarItems = [
  { label: "Home", icon: <IoMdHome size={30} />, path: "/" },
  { label: "All Todos", icon: <FaTasks size={26} />, path: "/all-todos" },
  { label: "Dashboard", icon: <TbLayoutDashboardFilled size={25} />, path: "/dashboard" },
  { label: "Streak", icon: <FaFire size={26} color="orangered" />, path: "/streak" },
  { label: "Theme", icon: <FaAffiliatetheme size={26} />, path: "/theme" },
  { label: "About", icon: <FaInfoCircle size={28} />, path: "/about" },
  { label: "Feedback", icon: <MdFeedback size={28} />, path: "/feedback" },
];

const Menu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selected.selectedIdx);
  const handleClick = (path, idx) => {
    dispatch(setSelectedIndex(idx));
    navigate(path);
  };
  return (
    <div>
      <TodosHeader />
      <div className="main-container menu-container">
        {sidebarItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex-container ${selected === idx ? "selected" : ""}`}
            onClick={() => handleClick(item.path, idx)}
            style={{ cursor: "pointer" }}
          >
            {item.icon}
            <h1>{item.label}</h1>
          </div>
        ))}
      </div>
      <TodosFooter />
    </div>
  )
}

export default Menu
