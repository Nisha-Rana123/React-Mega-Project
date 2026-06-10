import React, { useState } from "react"; 
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

 function LogoutBtn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            await authService.logout();
        } catch (error) {
            console.log("Logout failed on server, clearing local session anyway:", error);
        } finally {
            dispatch(logout());
            navigate("/", { replace: true });
            setIsLoggingOut(false);
        }
    };

    return(
 <button className='group relative inline-flex px-3 py-2 text-sm font-bold text-white transition duration-300 hover:text-violet-300'
  type="button"
  onClick={handleLogout}
  disabled={isLoggingOut}>{isLoggingOut ? "Logging out..." : "Logout"}</button>
    )
 }
export default LogoutBtn;
