import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
// import AuthCallbackPage from "./pages/AuthCallbackPage";
import Register from "./auth/Register";
import ErrorPage from "./pages/error/Error";
import Login from "./auth/login";
import RequireAuth from "./redux/features/auth/RequireAuth";
import UserProfilePage from "./pages/UserProfile";


export default function AppRoutes () {
    return (
        <Routes>
            {/* <Route path="/" element={<Layout><HomePage /></Layout>} /> */}
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
            <Route path="/" element={<LayoutWrapper />} >
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user-profile" element={<UserProfilePage />} />
                </Route>
                {/* <Route path="/auth-callback" element={<AuthCallbackPage />} /> */}
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

// function LayoutWrapper() {
//     const location = useLocation();

//     // Determine if Hero should be displayed based on the path
//     const showHero = location.pathname === "/" || location.pathname === "/dashboard";

//     return <Layout showHero={showHero} />;
// }
const heroVisiblePaths = ["/", "/dashboard", "/about", "/services", "/contact"]; // Example paths

function LayoutWrapper() {
    const location = useLocation();

    // Determine if Hero should be shown based on the current path
    const showHero = heroVisiblePaths.includes(location.pathname);

    return <Layout showHero={showHero} />;
}