import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
import AuthCallbackPage from "./pages/AuthCallbackPage";


export default function AppRoutes () {
    return (
        <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route path="/user-profile" element={<h1>Proifle</h1>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}