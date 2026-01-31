import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "/api/v1/user/register",
                method: "POST",
                body: inputData
            })
        }),

        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "/api/v1/user/login",
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(userLoggedIn({ user: data.data }))
                } catch (error) {
                    console.log("Login failed", error);
                }
            }

        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/api/v1/user/logout",
                method: "GET"
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "/api/v1/user/profile/update",
                method: "PUT",
                body: formData,
                credentials: "include"
            })
        }),

        loadUser: builder.query({
            query: () => (
                {
                    url: "/api/v1/user/profile",
                    method: "GET"
                }
            ),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(userLoggedIn({ user: data.data }))
                } catch (error) {
                    console.log("Login failed", error);
                }
            }
        }),







    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLoadUserQuery, useUpdateUserMutation, useLogoutUserMutation } = authApi;