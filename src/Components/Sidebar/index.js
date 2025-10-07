import { setSelectedIndex } from "../../features/selectedSlice";
import { useDispatch, useSelector } from "react-redux";

import { IoMdHome } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaAffiliatetheme } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { GoGoal } from "react-icons/go";

import { useNavigate } from "react-router-dom";
import { SidebarContainer, FlexContainer } from "../../styles";
import "./index.css"

const sidebarItems = [
  { label: "Home", icon: <IoMdHome size={30} />, path: "/" },
  { label: "All Tasks", icon: <FaTasks size={26} />, path: "/all-tasks" },
  { label: "Dashboard", icon: <TbLayoutDashboardFilled size={30} />, path: "/dashboard" },
  { label: "Goals", icon: <GoGoal size={26}/>, path: "/goals" },
  { label: "Streak", icon: <FaFire size={26} color="orangered" />, path: "/streak" },
  { label: "Theme", icon: <FaAffiliatetheme size={26} />, path: "/theme" },
  { label: "About", icon: <FaInfoCircle size={28} />, path: "/about" },
  { label: "Feedback", icon: <MdFeedback size={28} />, path: "/feedback" },

];

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme)
  const selected = useSelector((state) => state.selected.selectedIdx);
  const handleClick = (path, idx) => {
    dispatch(setSelectedIndex(idx));
    navigate(path);
  };

  return (
    <SidebarContainer bg={theme?.sidebar?.bg}>
      {sidebarItems.map((item, idx) => (
        <FlexContainer
          key={idx}
          selected={selected === idx}
          selectedColor={theme?.sidebar.text}
          onClick={() => handleClick(item.path, idx)}
        >
          {item.icon}
          <h1 className="item-label">{item.label}</h1>
        </FlexContainer>
      ))}




    </SidebarContainer>
  )
}

export default Sidebar
