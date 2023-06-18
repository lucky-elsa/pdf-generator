import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import selectReducer from './reducers/indexslice'
import authenticationReducer from './reducers/authentication'
import dataReducer from './reducers/dataslice'
import breshtimeReducer from './reducers/breshtimeslice'
import userReducer from './reducers/userslice'
import addReducer from './reducers/addslice'
import videoReduce from "./reducers/videoslice"
import notificationReduce from "./reducers/notificationslice"

const store = configureStore({
  reducer: {
    index: selectReducer,
    authenticater:authenticationReducer,
    data:dataReducer,
    breshtime:breshtimeReducer,
    user:userReducer,
    adddate:addReducer,
    video:videoReduce,
    notification:notificationReduce
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
