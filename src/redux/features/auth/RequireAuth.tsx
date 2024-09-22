import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated } from "./authSlice";
import { useLocation, Outlet, Navigate } from "react-router-dom";

export default function RequireAuth() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const auth = useAppSelector(state => state.auth.isAuthenticated)
    const location = useLocation();

    console.log('===============Authenticated', isAuthenticated);
    console.log('===============With select', auth);
    

    // If the user is authenticated, allow them to proceed to the requested route (render the Outlet)
    if (isAuthenticated) {
        return <Outlet />;
    }

    // If the user is not authenticated, redirect them to the login page
    // Pass the current location in state so they can be redirected back after logging in
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
}
