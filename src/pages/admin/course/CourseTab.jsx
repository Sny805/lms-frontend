import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/utills/RichTextEditor";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const [editCourse, { data, isLoading, error, isSuccess }] =
    useEditCourseMutation();

  const { data: courseData, isLoading: isCourseLoading, refetch } =
    useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [publishCourse] = usePublishCourseMutation();

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (isPublished) => {
    try {
      const response = await publishCourse({ courseId, publish: isPublished });
      if (response.data) {
        refetch();
        toast.success(
          response?.data?.message ||
            (isPublished ? "Course Published" : "Course Unpublished")
        );
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to publish");
    }
  };

  useEffect(() => {
    if (courseData?.course) {
      const course = courseData.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (isCourseLoading) return <h1>Loading...</h1>;

  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>

        <div className="flex flex-row gap-4">
          <Button
            disabled={courseData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(!courseData?.course.isPublished)
            }
          >
            {courseData?.course?.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <div className="space-y-5 mt-2">

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              placeholder="Ex. Fullstack developer"
              onChange={changeEventHandler}
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack dev in 2 months"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          {/* Select Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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

            {/* Level */}
            <div className="space-y-2">
              <Label>Course Level</Label>
              <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <Input type="file" accept="image/*" onChange={selectThumbnail} />

            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-full max-w-xs rounded-md border mt-2"
                alt="Course Thumbnail"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/course")}
            >
              Cancel
            </Button>

            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
