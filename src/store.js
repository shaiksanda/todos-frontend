import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { todoService } from "./services/todoService"
const store=configureStore({
    reducer:{
        [todoService.reducerPath]:todoService.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(todoService.middleware)
})

export default store

setupListeners(store.dispatch)