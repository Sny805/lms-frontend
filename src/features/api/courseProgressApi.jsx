import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API = "/api/v1/progress"

export const courseProgressApi = createApi({
    reducerPath: "courseProgressApi",
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PROGRESS_API,
        credentials: "include"
    }),

    endpoints: (builder) => ({
        // getCourseProgress
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `${courseId}`,
                method: "GET"
            })
        }),

        // updateLecture Update
        updateLectureProgres: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}/view`,
                method: "POST"
            })
        }),

        //  courseCompleted 
        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/complete`,
                method: "POST"
            })
        }),
        // course Incomplete
        inCompleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/incomplete`,
                method: "POST"
            })
        }),
    })
})

export const {useGetCourseProgressQuery,useUpdateLectureProgresMutation,useCompleteCourseMutation,useInCompleteCourseMutation} =courseProgressApi
