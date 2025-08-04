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
        getStreakData:builder.query({
            query:(filters)=>({
                url:'/streak',
                params:filters
            }),
            providesTags:["Todos"]
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
        getDashboardData:builder.query({
            query:(filter)=>({
                url:"/dashboard",
                params:filter
            }),
            providesTags:["Todos"]
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
        addGoal:builder.mutation({
            query:(goalData)=>({
                url:"/goal",
                method:"POST",
                body:goalData
            }),
            invalidatesTags:["Todos"]
        }),
        getGoals:builder.query({
            query:(filters)=>({
                url:"/goals",
                params:filters
            }),
            providesTags:["Todos"]
        }),
        updateGoal:builder.mutation({
            query:(updatedGoal)=>({
                url:`/goal/${updatedGoal._id}`,
                method:"PUT",
                body:updatedGoal
            }),
            invalidatesTags:["Todos"]
        }),
        deleteGoal:builder.mutation({
            query:(id)=>({
                url:`/goal/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        deleteAllGoals:builder.mutation({
            query:()=>({
                url:"/goals",
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        addFeedback:builder.mutation({
            query:(feedbackData)=>({
                url:"/feedback",
                method:"POST",
                body:feedbackData
            }),
            invalidatesTags:["Todos"]
        }),
        getFeedbacks:builder.query({
            query:(filters)=>({
                url:"/feedbacks",
                params:filters
            }),
            providesTags:["Todos"]
        }),
        updateFeedback:builder.mutation({
            query:(updatedFeedback)=>({
                url:`/feedback/${updatedFeedback._id}`,
                method:"PUT",
                body:updatedFeedback
            }),
            invalidatesTags:["Todos"]
        }),
        deleteFeedback:builder.mutation({
            query:(id)=>({
                url:`/feedback/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        })
        


    })
})

export const { useDeleteFeedbackMutation,useUpdateFeedbackMutation,useGetFeedbacksQuery,useAddFeedbackMutation,useUpdateGoalMutation,useDeleteAllGoalsMutation,useDeleteGoalMutation,useAddGoalMutation,useGetGoalsQuery,useUserLoginMutation, useUserRegisterMutation, useGetTodosQuery, useDeleteTodoMutation,useUpdateTodoStatusMutation,useAddTodoMutation,useUpdateTodoMutation,useForgotPasswordMutation,useDeleteAllTodosMutation,useGetDashboardDataQuery,useGetStreakDataQuery} = todoService