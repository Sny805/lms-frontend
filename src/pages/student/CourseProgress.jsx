import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import React, { useEffect, useState } from 'react'
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgresMutation } from '@/features/api/courseProgressApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Progress = () => {
  const { courseId } = useParams()

  const { data, isError, isLoading, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress, { }] = useUpdateLectureProgresMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess },] = useCompleteCourseMutation()
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess },] = useInCompleteCourseMutation()

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);
  
  if (isLoading) return (
    <div className="py-32 text-center text-gray-500 dark:text-gray-400">
      Loading Course Lectures.....
    </div>
  );


  if (isError) return <p>Failed to load course details</p>;
  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;

  const initialLecture = currentLecture || lectures[0];
  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  // Select Lecture Handler 
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  }
  // handle lecture progress
  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId })
    refetch();
  }

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };



  return (
    <div className='max-w-7xl mx-auto p-4'>
      {/* display course Name */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4 mt-20">
        <h1 className='text-2xl font-bold'>{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>
      {/*Video Section */}
      <div className="flex flex-col md:flex-row gap-6">

        <div className="flex-1 md:w-1/3 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              className="w-full h-80 md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            >
            </video>
          </div>
          <div className="mt-2">
            <h3 className='font-medium text-lg'>{`Lecture 
            ${lectures.findIndex((lecture) => lecture?._id === (currentLecture?._id || initialLecture?._id)) + 1}
             : ${currentLecture?.
                lectureTitle || initialLecture?.
                lectureTitle}`}</h3>
          </div>
        </div>

        {/* Lecture SideBar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {lectures.map((item, indx) => (
              <Card className={`mb-3 hover:cursor-pointer transition transform ${item._id === currentLecture?._id
                ? "bg-gray-200 dark:dark:bg-gray-800"
                : ""
                } `} key={item._id} onClick={() => handleSelectLecture(item)}>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    {
                      isLectureCompleted(item._id) ? (
                        <CheckCircle2 size={24} className="text-green-500 mr-2" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )
                    }
                    <div >
                      <CardTitle className="text-lg font-medium">
                        {item?.lectureTitle}
                      </CardTitle>
                    </div>

                  </div>
                  {
                    isLectureCompleted(item._id) && <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  }

                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Progress