import { setSelectedIndex } from "../../features/selectedSlice";
import { useDispatch, useSelector } from "react-redux";

import { IoMdHome } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaAffiliatetheme } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import "./index.css"

const sidebarItems = [
  { label: "Home", icon: <IoMdHome size={30} />, path: "/" },
  { label: "All Todos", icon: <FaTasks size={26} />, path: "/all-todos" },
  { label: "Dashboard", icon: <TbLayoutDashboardFilled size={25} />, path: "/dashboard" },
  {label:"Goals",icon:<FaFire size={26} />,path:"/goals"},
  { label: "Streak", icon: <FaFire size={26} color="orangered" />, path: "/streak" },
  { label: "Theme", icon: <FaAffiliatetheme size={26} />, path: "/theme" },
  { label: "About", icon: <FaInfoCircle size={28} />, path: "/about" },
  { label: "Feedback", icon: <MdFeedback size={28} />, path: "/feedback" },
  
];

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selected.selectedIdx);
  const handleClick = (path, idx) => {
    dispatch(setSelectedIndex(idx));
    navigate(path);
  };
  
  return (
    <aside>
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




    </aside>
  )
}

export default Sidebar
