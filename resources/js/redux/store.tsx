import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authenticationReducer from './reducers/authentication'
import userReducer from './reducers/userslice'
import crewingReducer from './reducers/crewingslice'
import categoryslice from './reducers/categoryslice'
import documentslice from './reducers/documentslice'
import marintimeslice from './reducers/marintimeslice'
import competencyslice from './reducers/competencyslice'
import medicalslice from './reducers/medicalslice'
import offshoreslice from './reducers/offshoreslice'
import seaslice from './reducers/seaslice'
import informationslice from './reducers/informationslice'
import personalslice from './reducers/personalslice'

const store = configureStore({
  reducer: {
    authenticater: authenticationReducer,
    user: userReducer,
    crewings: crewingReducer,
    categories: categoryslice,
    documents: documentslice,
    marintimes: marintimeslice,
    competencies: competencyslice,
    medicals: medicalslice,
    offshores: offshoreslice,
    seas: seaslice,
    informations: informationslice,
    personals: personalslice
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