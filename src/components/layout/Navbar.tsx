"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/hooks/redux-toolkit/slice/auth.slice";
import { AppDispatch, RootState } from "@/hooks/utils/redux";
import { NavbarProps } from "@/typescript/interface/layout.interface";
import { LogOut, Menu, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


export function Navbar({ toggleSidebar }: NavbarProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success("Logout Successfully!!");
      router.push("/");
    } catch (error) { 
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred during logout.");
    }
  }
  };
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 bg-white border-b shadow-sm">
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <h2 className="text-xl font-semibold hidden md:block"></h2>
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-3">
          <UserCircle className="h-8 w-8 text-primary" />
          {/* {isMounted ? ( */}
          <div>
            <h4 className="font-semibold text-sm leading-none">
              {user?.name || "User"}
            </h4>
            <p className="text-xs text-muted-foreground leading-none">
              {user?.email || "N/A"}
            </p>
          </div>
          {/* ): ""} */}
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Logout" 
          onClick={handleLogout}
          title="Log out of the account"
        >
          <LogOut className="h-5 w-5 text-red-500" />
        </Button>
      </div>
    </header>
  );
}
