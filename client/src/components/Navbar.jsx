import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  MenuIcon,
} from "lucide-react";
import { School } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser(); 
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between gap-10 h-full ">
        <div className="flex items-center space-x-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>
        {/* User icons and dark mode icon */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={user?.photoUrl  || "https://github.com/shadcn.png"}
                    className="rounded-full"
                  />
                  <AvatarFallback className="rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white">
                    AK
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-48 rounded-xl shadow-xl border bg-background p-2"
                align="end"
              >
                <DropdownMenuLabel className="px-3 py-2 text-sm font-bold text-blue-500 ">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                {user.role === "instructor" && (
                   <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </DropdownMenuItem>
                )}
                  

                  <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => navigate("/my-learning")}>
                    <User size={16} />
                    <span>My Learning</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer">
                    <Settings size={16} />
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Logout remains at the bottom for safety */}
                <DropdownMenuItem onClick={logoutHandler} className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer">
                  <LogOut size={16} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4 items-center">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Sign Up</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/*Mobile Device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="my-4" />

        {user ? (
          <>
            <nav className="flex flex-col gap-4">
              <div 
                onClick={() => navigate("/my-learning")} 
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer"
              >
                <User size={16} />
                <span>My Learning</span>
              </div>
              <div 
                onClick={() => navigate("/profile")} 
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer"
              >
                <Settings size={16} />
                <span>Edit Profile</span>
              </div>
              <div 
                onClick={logoutHandler} 
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </div>
            </nav>
            {user.role === "instructor" && (
              <SheetFooter className="mt-4">
                <Button onClick={() => navigate("/admin/dashboard")} className="w-full">
                  Dashboard
                </Button>
              </SheetFooter>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4">
             <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
             <Button onClick={() => navigate("/login")}>Sign Up</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};