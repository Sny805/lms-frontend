import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import DarkMode from "./DarkMode"
import { Link, useNavigate } from "react-router-dom"
import { useLogoutUserMutation } from "@/features/api/authApi"

export function SheetDemo({ user }) {
    const [logoutUser] = useLogoutUserMutation();

    const handleLogout = () => {
        logoutUser();
    }
    const navigate = useNavigate();
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"
                    variant="outline"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
               <SheetContent side="right" className="flex flex-col">
  {user ? (
    <>
      {/* Header */}
      <SheetHeader className="flex flex-row items-center justify-between mt-10">
        <h1 className="text-lg font-semibold">
          <Link to="/">My Account</Link>
        </h1>
        <DarkMode />
      </SheetHeader>

      {/* Navigation */}
      <nav className="flex flex-col ml-4 mt-4 ">
        <Link
          to="/profile"
          className="text-left text-gray-700 hover:text-black font-semibold mb-2 dark:text-white"
        >
          Edit Profile
        </Link>

        <Link
          to="/my-learning"
          className="text-left text-gray-700 hover:text-black font-semibold mb-2 dark:text-white"
        >
          My Learning
        </Link>

        <button
          className="text-left text-gray-700 hover:text-black font-semibold mb-2 dark:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Instructor Dashboard */}
      {user?.role === "instructor" && (
        <SheetClose asChild>
          <Button
            className="mt-2 mx-4"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </Button>
        </SheetClose>
      )}
    </>
  ) : (
    <>
      {/* Guest / Not Logged In */}
       
      <nav className="flex flex-col ml-4 mt-10 ">
        <Link
          to="/signup"
          className="text-left text-gray-700 hover:text-black font-semibold mb-2 dark:text-white"
        >
          Signup
        </Link>

        <Link
          to="/login"
          className="text-left text-gray-700 hover:text-black font-semibold  mb-4 dark:text-white"
        >
          Login
        </Link>
          <DarkMode />
      </nav>
    </>
  )}
</SheetContent>

     
           

        </Sheet>
    )
}
