import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from 'js-cookie';

export const todoService = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://todos-backend-d9im.onrender.com/",
        prepareHeaders: (headers) => {
            const token = Cookies.get("jwt_token"); // or from redux state
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Todos"],
    endpoints: builder => ({
        userLogin: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Todos"]
        }),
        userRegister: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Todos"]
        }),
        forgotPassword:builder.mutation({
            query:(data)=>({
                url:"/forgotPassword",
                method:"POST",
                body:data,
                headers:{}  // clears any default headers
            }),
            invalidatesTags:["Todos"]
        }),
        getTodos: builder.query({
            query: (filters) => ({
                url: "/todos",
                params: filters
            }),
            providesTags: ["Todos"]
        }),
        addTodo:builder.mutation({
            query:(newTodo)=>({
                url:"/todos",
                method:"POST",
                body:newTodo
            }),
            invalidatesTags:["Todos"]
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        deleteAllTodos:builder.mutation({
            query:()=>({
                url:"/todos",
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        updateTodo:builder.mutation({
            query:(updatedTodo)=>({
                url:`/todos/${updatedTodo.id}`,
                method:"PUT",
                body:updatedTodo
            }),
            invalidatesTags:["Todos"]
        }),
        
        updateTodoStatus: builder.mutation({
            query: (updatedTodo) => ({
                url: `/todos/${updatedTodo._id}`,
                method: 'PUT',          
                body: updatedTodo,     
            }),
            invalidatesTags: ["Todos"],  
        }),

    })
})

export const { useUserLoginMutation, useUserRegisterMutation, useGetTodosQuery, useDeleteTodoMutation,useUpdateTodoStatusMutation,useAddTodoMutation,useUpdateTodoMutation,useForgotPasswordMutation,useDeleteAllTodosMutation} = todoService