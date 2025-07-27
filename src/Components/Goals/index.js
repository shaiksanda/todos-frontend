import Sidebar from "../Sidebar"
import TodosHeader from "../TodosHeader"
import TodosFooter from "../TodosFooter"
import { MainContainer } from "../../styles"


import "./index.css"
import { useSelector } from "react-redux"

const Goals = () => {
    const theme=useSelector(state=>state.theme.theme)
    return (
        <div>
            <TodosHeader />
            <Sidebar />
            <MainContainer bg={theme?.main?.bg}>
                
                    <h3 className="under-working">
                        🚧 I’m working on this feature — it will be live on the website soon!
                    </h3>
                    <h1>Goals Page</h1>
                    <h1>Weekly Goals, Monthly Goals, Quarterly Goals, Yearly Goals</h1>
                
            </MainContainer>
          
            <TodosFooter />
        </div>
    )
}

export default Goals
