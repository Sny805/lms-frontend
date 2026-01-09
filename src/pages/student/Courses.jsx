import React from 'react'
import { SkeletonCard } from '@/utills/Skeleton'
import { Course } from './Course'
import { useGetPublishedCourseQuery } from '@/features/api/courseApi'

const Courses = () => {


    const { data, isSuccess, isLoading, isError } = useGetPublishedCourseQuery();


    if (isError) {
        return (
            <div className="py-20 text-center text-2xl font-bold text-red-500">
                Something went wrong while fetching courses.
            </div>
        )
    }
    const courses =  data?.courses ||[];
    const skeletonCount = 8;

    return (
        <section className="bg-gray-50 dark:bg-zinc-900 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <h1 className="font-extrabold text-2xl sm:text-3xl text-center mb-10 text-gray-900 dark:text-gray-100">
                    Our Courses
                </h1>

                {/* Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading &&
                        Array.from({ length: skeletonCount }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}

                    {!isLoading && courses.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-2xl font-bold">
                            No courses available right now.
                        </p>
                    )}

                    {!isLoading &&
                        courses.map((course) => (
                            <Course key={course._id} course={course} />
                        ))}
                </div>
            </div>
        </section>
    )
}

export default Courses