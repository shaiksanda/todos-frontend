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
import { MainContainer,FlexContainer } from "../../styles";

const sidebarItems = [
  { label: "Home", icon: <IoMdHome size={30} />, path: "/" },
  { label: "All Todos", icon: <FaTasks size={26} />, path: "/all-todos" },
  { label: "Dashboard", icon: <TbLayoutDashboardFilled size={25} />, path: "/dashboard" },
   { label: "Goals", icon: <FaFire size={26} />, path: "/goals" },
  { label: "Streak", icon: <FaFire size={26} color="orangered" />, path: "/streak" },
  { label: "Theme", icon: <FaAffiliatetheme size={26} />, path: "/theme" },
  { label: "About", icon: <FaInfoCircle size={28} />, path: "/about" },
  { label: "Feedback", icon: <MdFeedback size={28} />, path: "/feedback" },
];

const Menu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selected.selectedIdx);
  const theme=useSelector(state=>state.theme.theme)
  const handleClick = (path, idx) => {
    dispatch(setSelectedIndex(idx));
    navigate(path);
  };
  return (
    <div>
      <TodosHeader />
      <MainContainer bg={theme?.colors.light}>
        {sidebarItems.map((item, idx) => (
                <FlexContainer
                  key={idx}
                  selected={selected === idx}
                  selectedColor={theme?.sidebar.text}
                  onClick={() => handleClick(item.path, idx)}
                >
                  {item.icon}
                  <h1 >{item.label}</h1>
                </FlexContainer>
              ))}
       
      </MainContainer>
      <TodosFooter />
    </div>
  )
}

export default Menu
