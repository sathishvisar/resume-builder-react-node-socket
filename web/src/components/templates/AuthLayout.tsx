import { useAppSelector } from "@/store/hooks";
import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"



const AuthLayout: React.FC = () => {
    const location = useLocation();

    const { userInfo } = useAppSelector((state) => state.user);
    if (userInfo) {
        return <Navigate to="/app/resumes" state={{ from: location }} replace />;
    }
    
    return <div>
        <Outlet />
    </div>
}

export default AuthLayout