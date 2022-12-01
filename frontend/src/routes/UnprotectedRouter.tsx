import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const UnprotectedRouter = () => 
    <Routes>
               <Route path="*" element={<Login />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
    </Routes>
