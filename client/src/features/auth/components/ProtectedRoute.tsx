import { useAuth } from "../context/AuthContext";
import {useLocation, Navigate, Outlet} from "react-router-dom";


const ProtectedRoute = () => {
    const {isAuthenticated}  = useAuth();
    const location = useLocation();

    //如果没登录 -> 跳去 /login
    if (!isAuthenticated){
        return <Navigate to= "/login" replace state = {{from: location}}/>
        }
    //如果登录了 -> 渲染它下面的子路由
    return <Outlet />
}
export default ProtectedRoute;