import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate()

    const [createCourse, { data, isSuccess, isLoading, error }] = useCreateCourseMutation()

    const getSelectedCategory = (value) => {
        setCategory(value);
    };
    const createCourseHandler = async () => {
        createCourse({ category, courseTitle });
    }

    // for displaying toast
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created.");
            navigate("/admin/course");
        }
        if(error){
            toast.error(error?.data?.message || "Title and Category is required")
        }
    }, [isSuccess, error])


    return (
        <div className='flex-1 mx-10 my-20 md:my-0'>
            <div className="mb-4">
                <h1 className="font-bold text-xl">
                    Lets add course, add some basic course details for your new course
                </h1>
                <p className="text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
                    laborum!
                </p>
            </div>
            <div className='space-y-4'>
                <div className='flex flex-col gap-3'>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Your Course Name" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
                <div className='flex flex-col gap-3'>
                    <Label>Category</Label>
                    <Select
                        onValueChange={getSelectedCategory}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Frontend Development">
                                    Frontend Development
                                </SelectItem>
                                <SelectItem value="Fullstack Development">
                                    Fullstack Development
                                </SelectItem>
                                <SelectItem value="MERN Stack Development">
                                    MERN Stack Development
                                </SelectItem>
                                <SelectItem value="Javascript">Javascript</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex gap-2'>
                    <Link to="/admin/course" className='cursor-pointer'><Button variant="outline">Back</Button></Link>
                    <Button onClick={createCourseHandler} className="cursor-pointer" disabled={isLoading}>{isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Create"
                    )}</Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse