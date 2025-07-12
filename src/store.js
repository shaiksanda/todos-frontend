import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { todoService } from "./services/todoService"
import selectedReducer from "./features/selectedSlice"
import { persistStore,persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig={
    key:"selected",
    storage
}
const persistedReducer=persistReducer(persistConfig,selectedReducer)
const store=configureStore({
    reducer:{
        [todoService.reducerPath]:todoService.reducer,
        selected:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions:  [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER"
        ]
      },
    }).concat(todoService.middleware)
})

export default store
export const persistor = persistStore(store);

setupListeners(store.dispatch)