import { School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,

    DropdownMenuSeparator,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '@/utills/DarkMode'
import { SheetDemo } from '@/utills/SheetDemo'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useSelector((store) => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

    const handleLogout = () => {
        logoutUser();
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User log out.");
            navigate("/login");
        }
    }, [isSuccess]);

    return (
<div className='h-16 bg-white dark:bg-[#0A0A0A] border-b border-b-gray-200 dark:border-b-gray-800 fixed top-0 right-0 left-0 duration-300 z-10'>
            {/* Desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex gap-8'>
                    <School size={30} />
                    <Link to="/"><h1 className='hidden md:block font-extrabold text-2xl '>E-Learning</h1></Link>
                </div>
                {/* User Icons and darkmode icons */}

                <div className='flex gap-4'>
                    {
                        user ? (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-52 mr-4" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link to="/profile"> Edit  Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="my-learning">
                                            My Learning
                                        </Link>

                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Log out

                                    </DropdownMenuItem>


                                </DropdownMenuGroup>



                                {
                                    user.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link to="/admin/dashboard"> Dashboard</Link>
                                            </DropdownMenuItem>
                                        </>
                                    )
                                }

                            </DropdownMenuContent>
                        </DropdownMenu>) : (
                            <div className='flex gap-2 items-center'>
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/signup")}>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>


            </div>

            <div className='flex justify-between items-center px-4 md:hidden h-full'>
                <Link to="/"><h1 className='text-2xl font-extrabold'>E-Learning</h1></Link>
                <SheetDemo user={user}/>
            </div>


        </div>
    )
}

export default Navbar