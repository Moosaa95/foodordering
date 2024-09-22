import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";

export default function MobileNav() {
    // Destructure necessary states from useAuth hook
    const { isAuthenticated } = useAuth();
    // const { user, userError, isAuthenticated, isFetchingUser, isLoading } = useAuth();

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {/* {isLoading || isFetchingUser ? (
                        <span>Loading...</span>
                    ) : isAuthenticated && user ? (
                        <span className="flex items-center gap-2 font-bold">
                            <CircleUserRound className="text-orange-500" />
                            {user.email}
                        </span>
                    ) : (
                        <span>Welcome to EatFood</span>
                    )} */}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {!isAuthenticated ? (
                        <Button className="flex-1 font-bold bg-orange-500">
                            Login
                        </Button>
                    ) : (
                        <span>Navigation Links</span>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}
