import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const courseProgressApi = createApi({
    reducerPath: "courseProgressApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include"
    }),

    endpoints: (builder) => ({
        // getCourseProgress
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `/api/v1/progress/${courseId}`,
                method: "GET"
            })
        }),

        // updateLecture Update
        updateLectureProgres: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `/api/v1/progress/${courseId}/lecture/${lectureId}/view`,
                method: "POST"
            })
        }),

        //  courseCompleted 
        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `/api/v1/progress/${courseId}/complete`,
                method: "POST"
            })
        }),
        // course Incomplete
        inCompleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/api/v1/progress/${courseId}/incomplete`,
                method: "POST"
            })
        }),
    })
})

export const {useGetCourseProgressQuery,useUpdateLectureProgresMutation,useCompleteCourseMutation,useInCompleteCourseMutation} =courseProgressApi
