import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Todo from "./Components/Todo"
import Dashboard from "./Components/Dashboard"
import AllTodos from "./Components/AllTodos"
import Feedback from "./Components/Feedback"
import About from "./Components/About"
import Theme from "./Components/Theme"
import Streak from "./Components/Streak"
import Menu from "./Components/Menu";
import Goals from "./Components/Goals"
import VerifyEmail from "./Components/VerifyEmail";

import ForgotPassword from "./Components/ForgotPassword"
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/todo" element={<ProtectedRoute element={<Todo />} />} />
        <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
        <Route path="/all-todos" element={<ProtectedRoute element={<AllTodos />} />} />
        <Route path='/feedback' element={<ProtectedRoute element={<Feedback />} />} />
        <Route path='/about' element={<ProtectedRoute element={<About />} />} />
        <Route path='/theme' element={<ProtectedRoute element={<Theme />} />} />
        <Route path='/streak' element={<ProtectedRoute element={<Streak />} />} />
        <Route path="/goals" element={<ProtectedRoute element={<Goals />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
