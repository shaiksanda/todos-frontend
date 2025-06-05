import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Todo from "./Components/Todo"
import Dashboard from "./Components/Dashboard"
import AllTodos from "./Components/AllTodos"
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
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/todo" element={<ProtectedRoute element={<Todo />} />} />
        <Route path="/all-todos" element={<ProtectedRoute element={<AllTodos />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
