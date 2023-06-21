import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CounterState {
    id: number,
    name: string,
    avatar: string,
    authentication: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
    id: 0,
    name: "",
    avatar: "",
    authentication: false
}

export const authenticationSlide = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setid: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setname: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        },
        setAuthentication: (state, action: PayloadAction<boolean>) => {
            state.authentication = action.payload;
        },
    },
})

export const { setAvatar, setAuthentication, setname, setid } = authenticationSlide.actions

export default authenticationSlide.reducer