import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const todoService=createApi({
    reducerPath:"todoApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://todos-backend-d9im.onrender.com/"}),
    tagTypes:["Todos"],
    endpoints:builder=>({
        userLogin:builder.mutation({
            query:(data)=>({
                url:"/login",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Todos"]
        }),
        userRegister:builder.mutation({
            query:(data)=>({
                url:"/register",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Todos"]
        })
    })
})

export const {useUserLoginMutation,useUserRegisterMutation}=todoService