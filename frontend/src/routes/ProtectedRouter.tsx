import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { BlockEditor } from "../pages/Block";
import { createContext, useState } from "react";

const AuthProtectedRoutes = () => {
    const { logged } = useAuth();
    return logged ? <Outlet /> : <Login />
}


export const ProtectedRouter = () => {

    return (
            <Routes>
                    <Route path="*" element={<Home />} />
                    <Route path="/menu" element={<Home />} />
                    <Route path="/block/*" element={<BlockEditor />} />
            </Routes>
    )
} 
    