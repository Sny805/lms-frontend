import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");

    const { courseId } = useParams();

    const [createLecture, { data, error, isLoading, isSuccess  }] = useCreateLectureMutation();
    const { data: lectureData, isLoading: lectureLoading, isError: lectureError,refetch } = useGetCourseLectureQuery(courseId);


    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message);
            refetch();
        }
        if (error) {
            toast.error(error.data.message);
        }
    }, [isSuccess, error]);


    return (
        <div className='flex-1 mx-10 my-20 md:mt-0'>
            <div className="mb-4">
                <h1 className="font-bold text-xl">
                    Let's add lectures, add some basic details for your new lecture
                </h1>
                <p className="text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
                    laborum!
                </p>
            </div>
            <div className='space-y-4'>
                <div className='flex flex-col gap-3'>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Your Course Name" value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)} />
                </div>

                <div className='flex gap-2'>
                    <Link to={`/admin/course/${courseId}`} className='cursor-pointer'><Button variant="outline">Back to Course</Button></Link>
                    <Button onClick={createLectureHandler} className="cursor-pointer" disabled={isLoading} >{isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Create Lecture"
                    )}</Button>
                </div>
                <div className="mt-10">
                    {lectureLoading ? (<p>Loading...</p>) : lectureError
                        ? (<p>Failed to load lecture</p>) :
                        (lectureData.lectures.length == 0 ? <p>No Lecture Found</p> :
                            lectureData?.lectures?.map((lecture, i) => (
                                <Lecture lecture={lecture} key={lecture.id} i={i} courseId={courseId} />
                            ))
                        )}
                </div>
            </div>
        </div>
    )
}

export default CreateLecture