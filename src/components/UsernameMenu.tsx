import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";

export default function UsernameMenu() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {user, isLoading, isFetchingUser} = useAuth()

    const handleLogout = () => {
        dispatch(logOut());
        navigate("/login");
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 font-bold hover:text-orange-500">
                <CircleUserRound className="text-orange-500" />
                {isFetchingUser ? (
                    <p>Fetching name....</p>
                ): (
                    user?.email
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link className="font-bold hover:text-orange-500" to="/user-profile">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button onClick={handleLogout}  className="flex flex-1 font-bold bg-orange-500">
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}