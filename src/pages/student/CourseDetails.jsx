import ByCourseButton from "@/components/ByCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import ReactPlayer from "react-player";
import { BadgeInfo, LockIcon, PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading)
    return (
      <div className="py-32 text-center text-gray-500 dark:text-gray-400">
        Loading course details...
      </div>
    );

  if (isError)
    return (
      <div className="py-32 text-center text-red-500">
        Failed to load course details.
      </div>
    );

  const { course, purchased } = data;

  const {
    courseTitle,
    creator,
    subTitle,
    description,
    createdAt,
    enrolledStudents,
    lectures,
    coursePrice,
  } = course;

  const handleContinueCourse = () => {
    if (purchased) navigate(`/course-progress/${courseId}`);
  };

  return (
    <section className="mt-16">

      {/* HERO SECTION */}
      <div className="bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 space-y-2">
          <h1 className="font-extrabold text-2xl md:text-3xl">
            {courseTitle}
          </h1>

          <p className="text-sm md:text-base text-gray-300">{subTitle}</p>

          <p className="text-sm">
            Created by{" "}
            <span className="text-blue-400 underline italic">
              {creator?.fullName}
            </span>
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <BadgeInfo size={16} />
            <span>Last Updated: {createdAt?.split("T")[0]}</span>
          </div>

          <p className="text-sm text-gray-300">
            Students Enrolled: {enrolledStudents?.length}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto my-8 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* Description */}
          <div>
            <h2 className="font-bold text-xl mb-2 dark:text-white">
              Description
            </h2>
            <div
              className="text-sm text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Course Content */}
          <Card className="dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {lectures.length} lectures
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {lectures.map((lecture, i) => (
                <div
                  key={lecture._id}
                  className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  {purchased ? (
                    <PlayCircle size={16} className="text-green-500" />
                  ) : (
                    <LockIcon size={16} className="text-gray-400" />
                  )}

                  <span className="truncate">{lecture.lectureTitle}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full">

          <Card className="dark:bg-zinc-900 dark:border-zinc-800">
            <CardContent className="p-4 space-y-4">

              {/* Preview Video */}
              {lectures[0]?.videoUrl && (
                <div className="w-full aspect-video rounded-md overflow-hidden">
                  <video
                    width="100%"
                    height="100%"
                    url={lectures[0].videoUrl}
                    controls
                  >
                  </video>
                </div>
              )}

              <Separator />

              {/* Price */}
              <p className="text-lg font-bold dark:text-white">
                ₹ {coursePrice}
              </p>
              <p className="font-bold">{courseTitle}</p>
            </CardContent>

            <CardFooter>
              {purchased ? (
                <Button className="w-full" onClick={handleContinueCourse}>
                  Continue Course
                </Button>
              ) : (
                <ByCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
