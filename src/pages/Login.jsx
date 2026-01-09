import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { Eye, EyeOff } from 'lucide-react';

import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [signupIn, setSignupIn] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "student",
    })

    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    })

    // Handle form input changes
    const handleChange = (e, type) => {
        const { name, value } = e.target
        if (type === "signup") {
            setSignupIn({ ...signupIn, [name]: value })
        } else {
            setSignIn({ ...signIn, [name]: value })
        }
    }

    const handleRoleChange = (value) => {
        setSignupIn({ ...signupIn, role: value })
    }

    const [registerUser, { data: registerData, error: registerError, isLoading: registerLoading, isSuccess: registerSuccess }] = useRegisterUserMutation();

    const [loginUser, { data: loginData, error: loginError, isLoading: loginLoading, isSuccess: loginSuccess }] = useLoginUserMutation()



    useEffect(() => {
        if (registerSuccess && registerData) {
            toast.success(registerData?.message || "Signup Successfully");
        }

        if (loginSuccess && loginData) {
            toast.success(loginData?.message || "Login Successfully");
            navigate("/")
        }

        if (registerError) {
            toast.error(registerError?.data?.message || "Signup Failed");
        }

        if (loginError) {
            toast.error(loginError?.data?.message || "Login Failed");
        }
    }, [registerSuccess, registerData, loginSuccess, loginData, registerError, loginError]);



    const handleRegistration = async (type) => {
        let formData = type === "signup" ? signupIn : signIn
        let action = type === "signup" ? registerUser : loginUser;
        action(formData)

    }





    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                {/* Signup Form */}
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Your Account</CardTitle>
                            <CardDescription>
                                Join us today! It's quick and easy
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter Your Full Name"
                                    required
                                    name="fullName"
                                    value={signupIn.fullName}
                                    onChange={(e) => handleChange(e, "signup")}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="signupEmail">Email</Label>
                                <Input
                                    id="signupEmail"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    required
                                    name="email"
                                    value={signupIn.email}
                                    onChange={(e) => handleChange(e, "signup")}
                                />
                            </div>

                            <div className="grid gap-2 relative">
                                <Label htmlFor="signupPassword">Password</Label>
                                <Input
                                    id="signupPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Your Password"
                                    required
                                    name="password"
                                    value={signupIn.password}
                                    onChange={(e) => handleChange(e, "signup")}
                                />
                                <span
                                    className='absolute right-3 top-7.5 cursor-pointer text-gray-500'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>

                            <div className="grid gap-2">
                                <Label>Role</Label>
                                <RadioGroup
                                    value={signupIn.role}
                                    onValueChange={handleRoleChange}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="student" id="student" />
                                        <Label htmlFor="student">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="instructor" id="instructor" />
                                        <Label htmlFor="instructor">Instructor</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleRegistration("signup")} disabled={registerLoading}>
                                {
                                    registerLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /></>) : "Sign Up"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Login Form */}
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome Back</CardTitle>
                            <CardDescription>
                                Please login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="loginEmail">Email Address</Label>
                                <Input
                                    id="loginEmail"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    required
                                    name="email"
                                    value={signIn.email}
                                    onChange={(e) => handleChange(e, "login")}
                                />
                            </div>

                            <div className="grid gap-2 relative">
                                <Label htmlFor="loginPassword">Password</Label>
                                <Input
                                    id="loginPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Your Password"
                                    required
                                    name="password"
                                    value={signIn.password}
                                    onChange={(e) => handleChange(e, "login")}
                                />
                                <span
                                    className='absolute right-3 top-7.5 cursor-pointer text-gray-500'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleRegistration("login")} disabled={loginLoading}>
                                {
                                    loginLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /></>) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
