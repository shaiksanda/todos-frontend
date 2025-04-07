import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Todo from "./Components/Todo"
import Dashboard from "./Components/Dashboard"
import AllTodos from "./Components/AllTodos"
import ForgotPassword from "./Components/ForgotPassword"
import ProtectedRoute from "./Components/ProtectedRoute";
import Cookies from 'js-cookie';
import './App.css';

const isAuthenticated = () => {
  const token = Cookies.get('jwt_token');
  return Boolean(token); // returns true if token exists
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/todo" /> : <Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/todo" element={<ProtectedRoute element={<Todo />} />} />
        <Route path="/all-todos" element={<ProtectedRoute element={<AllTodos />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
