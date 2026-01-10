import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ['Refetch_Creator_Course', 'Refetch_Lecture'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "/api/v1/course",
                method: "POST",
                body: { courseTitle, category },
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "/api/v1/course",
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),

        getSearchCourse: builder.query({
            query: ({ searchQuery, categories, sortByPrice }) => {
                // Build qiery string
                let queryString = `/api/v1/course/search?query=${encodeURIComponent(searchQuery)}`

                // append cateogry 
                if (categories && categories.length > 0) {
                    const categoriesString = categories.map(encodeURIComponent).join(",");
                    queryString += `&categories=${categoriesString}`;
                }

                // Append sortByPrice is available
                if (sortByPrice) {
                    queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
                }

                return {
                    url: queryString,
                    method: "GET",
                }
            }
        }),
        getPublishedCourse: builder.query({
            query: () => ({
                url: "/api/v1/course/published-course",
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/api/v1/course/${courseId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),

        getCourseById: builder.query({
            query: (courseId) => (
                {
                    url: `/api/v1/course/${courseId}`,
                    method: "GET"
                }

            )
        }),

        ////  Lecture  Api calls
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/api/v1/course/${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle }

            }),

        }),

        getCourseLecture: builder.query({
            query: (courseId) => (
                {
                    url: `/api/v1/course/${courseId}/lecture`,
                    method: "GET"
                }
            ),
            providesTags: ["Refetch_Lecture"]
        }),
        editLecture: builder.mutation({
            query: ({ courseId, lectureId, lectureTitle, videoInfo, isPreviewFree }) => ({
                url: `/api/v1/course/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree }
            })
        }),
        deleteLecture: builder.mutation({
            query: (lectureId) => (
                {
                    url: `/api/v1/course/lecture/${lectureId}`,
                    method: "DELETE"
                }
            ),
            invalidatesTags: ["Refetch_Lecture"]
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/api/v1/course/lecture/${lectureId}`,
                method: "GET"
            })
        }),

        publishCourse: builder.mutation({
            query: ({ courseId, publish }) => ({
                url: `/api/v1/course/${courseId}`,
                method: "PATCH",
                params: { publish }
            }),
            invalidatesTags: ["Refetch_Creator_Course"]
        })


    })

})

export const {
    useCreateCourseMutation,
    useGetCreatorCourseQuery,
     useGetSearchCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useDeleteLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useGetPublishedCourseQuery,
   
} = courseApi