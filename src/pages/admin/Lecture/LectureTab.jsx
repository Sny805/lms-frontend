import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useDeleteLectureMutation, useEditLectureMutation, useGetLectureByIdQuery } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'


const MEDIA_API = "/api/v1/media"

const LectureTab = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideInfo, setUploadVideoInfo] = useState({});
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);
    const [fileName, setFileName] = useState();
    const fileRef = useRef();
    const { courseId, lectureId } = useParams()

    const handleButtonClick = () => {
        fileRef.current.click();
    }
    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const formData = new FormData();
            formData.append("file", file);
            try {
                setMediaProgress(true);
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {

                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round(loaded * 100 / total))
                    }
                })
                if (res.data.success) {
                    setUploadVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id,
                    });
                    setBtnDisable(false)
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error)
                toast.error("video upload failed")
            }
            finally {
                setMediaProgress(false);
            }
        }



    }
    const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation()
    const [deleteLecture, { data: removeData, isSuccess: deleteSuccesss, error: deleteError, isLoading: removeLoading }] = useDeleteLectureMutation()
    const { data: lectureData } = useGetLectureByIdQuery(lectureId)
    const lecture = lectureData?.lecture
    
    useEffect(() => {
        setLectureTitle(lecture?.lectureTitle)
        setIsFree(lecture?.isPreviewFree);
        setUploadProgress(lecture?.videoInfo)
    }, [lecture])

    const deleleLectureHandler = async () => {
        await deleteLecture(lectureId)
    }
    const editLectureHandler = async () => {
        await editLecture({ lectureTitle, lectureId, courseId, videoInfo: uploadVideInfo, isPreviewFree: isFree })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Lecture Updated Successfully")
        }
        if (error) {
            toast.success(error?.message || "Failed to update lecture")
        }
        if (deleteSuccesss) {
            toast.success(removeData?.message)
        }
    }, [isSuccess, error, deleteSuccesss, deleteError])


    return (
        <Card className="m-4 ">
            <CardHeader>
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription className="mt-2">
                        Make changes and click save when done.
                    </CardDescription>
                </div>
                <div>
                    <Button disabled={removeLoading} variant="destructive" className="mt-3" onClick={deleleLectureHandler}>{
                        removeLoading ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </> : "Remove Lecture"
                    }</Button>
                </div>
            </CardHeader>

            <CardContent>
                <div>
                    <label htmlFor="">Title</label>
                    <Input
                        type="text"
                        placeholder="Ex. Introduction to Javascript"
                        className="mt-2"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <p>Video <span className="text-red-500">*</span></p>
                    <Input
                        type="file"
                        accept="video/*"
                        className="w-fit mt-2 hidden"
                        onChange={fileChangeHandler}
                        ref={fileRef}

                    />
                    <Button
                        type="button"
                        onClick={handleButtonClick}
                        className="px-4 py-2 mt-2 inline-block"
                        variant="outline"
                    >
                        Select Video
                    </Button>
                    {fileName && (
                        <p className="mt-2 text-sm text-gray-700">
                            Selected file: <span className="font-medium">{fileName}</span>
                        </p>
                    )}
                </div>
                <div className="flex items-center space-x-2 my-5">
                    <Switch id="airplane-mode" checked={isFree} onCheckedChange={setIsFree} />
                    <Label htmlFor="airplane-mode">Is this video FREE</Label>
                </div>
                {
                    mediaProgress && (
                        <div className="mt-2">
                            <Progress value={uploadProgress} />
                            <p>{uploadProgress} % uploaded</p>
                        </div>
                    )
                }
                <div>
                    <Button onClick={editLectureHandler} disabled={isLoading}>
                        {
                            isLoading ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </> : "Update Lecture"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab