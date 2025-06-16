import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiPractice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:""
    }),
    endpoints:builder=>({
        getTodos:builder.query({
            query:()=>({}),
            invalidatesTags:["todos"]
        }),
        addTodo:builder.mutation({
            query:()=>({

            })
        })
    })
})