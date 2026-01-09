import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Link } from 'react-router-dom'

export const Course = ({ course }) => {

    const { courseTitle, courseLevel, creator, coursePrice,_id } = course
    return (
        <>
            <Link to={`/course-detail/${_id}`}>
                <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer p-0">

                    {/* Course Thumbnail */}
                    <img
                        src={course.courseThumbnail}
                        alt="course"
                        className="w-full h-48 sm:h-56 md:h-36 object-cover"
                    />

                    {/* Card Body */}
                    <CardContent className="px-5 py-4 space-y-3">
                        <h2 className="hover:underline font-bold text-lg truncate">
                            {courseTitle}
                        </h2>

                        <div className="flex items-center justify-between">
                            {/* Instructor */}
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarImage src={creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                    <AvatarFallback>SN</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{creator?.fullName}</span>
                            </div>

                            {/* Difficulty Badge */}
                            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                                {courseLevel}
                            </Badge>
                        </div>

                        {/* Price */}
                        <div className="text-lg font-bold">{coursePrice}</div>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}
