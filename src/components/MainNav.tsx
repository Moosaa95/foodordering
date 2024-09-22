// Import necessary dependencies
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { useNavigate } from "react-router-dom";

export default function MainNav() {
    // Destructure isAuthenticated from useAuth hook
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    console.log('auth', isAuthenticated);
    

    // Handler function for login button click
    const handleLoginClick = () => {
        // Redirect to the login page
        navigate('/auth/login');
    };

    return (
        <span className="flex items-center space-x-2">
            {isAuthenticated ? (
                <UsernameMenu />
            ) : (
                <Button 
                    onClick={handleLoginClick} 
                    variant="ghost" 
                    className="font-bold hover:text-orange-500 hover:bg-white"
                >
                    Login
                </Button>
            )}
        </span>
    );
}
