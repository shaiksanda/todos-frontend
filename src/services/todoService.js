import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from 'js-cookie';

export const todoService = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://tm-backend-bfoy.onrender.com",
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
                url: "/users/login",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Todos"]
        }),
        getStreakData:builder.query({
            query:(filters)=>({
                url:'/users/streak',
                params:filters
            }),
            providesTags:["Todos"]
        }),
        userRegister: builder.mutation({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Todos"]
        }),
        resetPassword:builder.mutation({
            query:(data)=>({
                url:"/users/resetPassword",
                method:"POST",
                body:data,
                headers:{}  // clears any default headers
            }),
            invalidatesTags:["Todos"]
        }),
        getTodos: builder.query({
            query: (filters) => ({
                url: "/tasks/getTasks",
                params: filters
            }),
            providesTags: ["Todos"]
        }),
        getDashboardData:builder.query({
            query:(filter)=>({
                url:"/users/dashboard",
                params:filter
            }),
            providesTags:["Todos"]
        }),
        addTodo:builder.mutation({
            query:(newTodo)=>({
                url:"/tasks/postTask",
                method:"POST",
                body:newTodo
            }),
            invalidatesTags:["Todos"]
        }),
        sendOtp:builder.mutation(({
            query:(data)=>({
                url:"/users/sendOtp",
                method:"POST",
                body:data

            }),
            invalidatesTags:["Todos"]
        })),
        verifyOtp:builder.mutation({
            query:(data)=>({
                url:"/users/verifyOtp",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Todos"]
        }),
        
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/tasks/deleteTask/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        deleteAllTodos:builder.mutation({
            query:()=>({
                url:"/tasks/deleteAllTasks",
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        updateTodo:builder.mutation({
            query:(updatedTodo)=>({
                url:`/tasks/updateTask/${updatedTodo.id}`,
                method:"PUT",
                body:updatedTodo
            }),
            invalidatesTags:["Todos"]
        }),
        
        updateTodoStatus: builder.mutation({
            query: (updatedTodo) => ({
                url: `/tasks/updateTask/${updatedTodo._id}`,
                method: 'PUT',          
                body: updatedTodo,     
            }),
            invalidatesTags: ["Todos"],  
        }),
        addGoal:builder.mutation({
            query:(goalData)=>({
                url:"/goals/postGoal",
                method:"POST",
                body:goalData
            }),
            invalidatesTags:["Todos"]
        }),
        getGoals:builder.query({
            query:(filters)=>({
                url:"/goals/getGoals",
                params:filters
            }),
            providesTags:["Todos"]
        }),
        updateGoal:builder.mutation({
            query:(updatedGoal)=>({
                url:`/goals/updateGoal/${updatedGoal._id}`,
                method:"PUT",
                body:updatedGoal
            }),
            invalidatesTags:["Todos"]
        }),
        deleteGoal:builder.mutation({
            query:(id)=>({
                url:`/goals/deleteGoal/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        deleteAllGoals:builder.mutation({
            query:()=>({
                url:"/goals/deleteAllGoals",
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        }),
        addFeedback:builder.mutation({
            query:(feedbackData)=>({
                url:"/feedback/postFeedback",
                method:"POST",
                body:feedbackData
            }),
            invalidatesTags:["Todos"]
        }),
        getFeedbacks:builder.query({
            query:(filters)=>({
                url:"/feedback/getFeedbacks",
                params:filters
            }),
            providesTags:["Todos"]
        }),
        updateFeedback:builder.mutation({
            query:(updatedFeedback)=>({
                url:`/feedback/updateFeedback/${updatedFeedback._id}`,
                method:"PUT",
                body:updatedFeedback
            }),
            invalidatesTags:["Todos"]
        }),
        deleteFeedback:builder.mutation({
            query:(id)=>({
                url:`/feedback/deleteFeedback/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Todos"]
        })
        


    })
})

export const { useVerifyOtpMutation,useSendOtpMutation,useDeleteFeedbackMutation,useUpdateFeedbackMutation,useGetFeedbacksQuery,useAddFeedbackMutation,useUpdateGoalMutation,useDeleteAllGoalsMutation,useDeleteGoalMutation,useAddGoalMutation,useGetGoalsQuery,useUserLoginMutation, useUserRegisterMutation, useGetTodosQuery, useDeleteTodoMutation,useUpdateTodoStatusMutation,useAddTodoMutation,useUpdateTodoMutation,useResetPasswordMutation,useDeleteAllTodosMutation,useGetDashboardDataQuery,useGetStreakDataQuery} = todoService