import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { todoService } from "./services/todoService"

import { persistStore,persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import selectedReducer from "./features/selectedSlice"
import themeReducer from "./features/themeSlice"
import authReducer from "./features/authSlice"

const selectPersistConfig={
    key:"selected",
    storage
}
const themePersistConfig = {
  key: "theme",
  storage,
};

const authPersistConfig={
  key:"auth",
  storage
}
const selectPersistedReducer=persistReducer(selectPersistConfig,selectedReducer)
const themePersistedReducer=persistReducer(themePersistConfig,themeReducer)
const authPersistReducer=persistReducer(authPersistConfig,authReducer)
const store=configureStore({
    reducer:{
        [todoService.reducerPath]:todoService.reducer,
        selected:selectPersistedReducer,
        theme:themePersistedReducer,
        auth:authPersistReducer
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