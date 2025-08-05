
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';

import { HomeContainer,DashboardHeading,DashboardContent,HeaderButton } from '../../styles';
import { useSelector } from 'react-redux';
import "./index.css"

const Home = () => {
    const theme = useSelector(state => state.theme.theme)

    const jwtToken = Cookies.get("jwt_token")
    if (jwtToken) {
        return <Navigate to="/todo" />  // Redirect to Todo page if JWT token is present.  
    }
    return (
        <main className='app-container'>
            <Header />
            <HomeContainer bg={theme?.main.bg} >
                <div className='todo-content-container'>
                    <DashboardHeading  color={theme?.colors.dark} >Focus On What Matters.</DashboardHeading>
                    <DashboardContent color={theme?.colors.primary} >Life is full of noise, but your goals deserve clarity. With our app, organize your tasks, prioritize what’s important, and achieve more with ease. Simplify your day and make every moment count.</DashboardContent>
                    <Link to="/login" className='login-button'><HeaderButton style={{marginTop:"10px",width:'120px',alignSelf:"center"}} color={"white"} bg={theme?.colors.primary}>Start Now</HeaderButton></Link>
                </div>
                <div className='todo-image-container'>
                    <img className='todo-image' src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749118861/todo-images_ehns3k.webp" alt="todo" />
                </div>
            </HomeContainer>
        </main>
    )

}

export default Home;    