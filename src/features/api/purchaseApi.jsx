import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "/api/v1/purchase/";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const purchaseApi = createApi({
    reducerPath: "purchaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({

        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url: "/api/v1/purchase/checkout/create-checkout-session",
                method: "POST",
                body: { courseId }
            })
        }),
        getCourseDetailWithStatus: builder.query({
            query: (courseId) => ({
                url: `/api/v1/purchase/course/${courseId}/detail-with-status`,
                method: "GET",
            })
        }),
        getPurchasedCourses: builder.query({
            query: () => ({
                url: `/api/v1/purchase//`,
                method: "GET",
            }),
        }),



    })
})


export const { useCreateCheckoutSessionMutation,useGetCourseDetailWithStatusQuery,useGetPurchasedCoursesQuery } = purchaseApi;