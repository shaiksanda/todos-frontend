import {Component} from 'react'
import { Link,Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import "./index.css"

class Home extends Component {
    render(){
        const jwtToken=Cookies.get("jwt_token")
        if(jwtToken){
            return <Navigate to="/todo" />  // Redirect to Todo page if JWT token is present.  
        }
        return (
            <div>
                <Header />
                <div className='home-container'>
                    <div className='todo-content-container'>
                        <h1 className='home-heading'>Focus On What Matters.</h1>
                        <p className='todo-content'>Life is full of noise, but your goals deserve clarity. With our app, organize your tasks, prioritize what’s important, and achieve more with ease. Simplify your day and make every moment count.</p>
                        <Link to="/login"><button className='start-now-button'>Start Now</button></Link>
                    </div>
                    <div>
                        <img className='todo-image' src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1732187723/968ed86b54a12f62717ab10e15f16a9e_rrjg0b.jpg" alt="todo" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;    