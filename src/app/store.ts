import { configureStore } from "@reduxjs/toolkit";
import gptsReducer from "./slices/gptsSlice"
import activeGptReducer from "./slices/activeGptSlice"
import { combineReducers } from "@reduxjs/toolkit";
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import { thunk } from "redux-thunk";
import settingsReducer from "./slices/settingsSlice"


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    gpts: gptsReducer,
    activeGpt: activeGptReducer,
    settings: settingsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


export const persistor = persistStore(store)