import {combineReducers, configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./reducers/userReducer"
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {thunk} from "redux-thunk"
import profileReducer from "./reducers/profileReducer"
import courseReducer from "./reducers/courseReducer"
import adminReducer from "./reducers/adminReducer"
export const server="http://localhost:5000"
const persistConfig={
    key:'root',
    storage
}
const persistConfig1={
    key:'root1',
    storage
}
const persistedReducer=persistReducer(persistConfig,userReducer);
const persistedReducer1=persistReducer(persistConfig1,courseReducer)
export const store=configureStore({
    reducer:{
        users:persistedReducer,
        profile:profileReducer,
        courses:persistedReducer1,
        admin:adminReducer,
        middleware:[thunk]
    }
})
export const persistor=persistStore(store);