import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CounterState {
    id:number,
    name: string,
    admin: boolean,
    client: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
    id:0,
    name: "",
    admin: false,
    client: false
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
        setadmin: (state, action: PayloadAction<boolean>) => {
            state.admin = action.payload;
        },
        setclient: (state, action: PayloadAction<boolean>) => {
            state.client = action.payload;
        },
    },
})

export const { setadmin, setclient,setname,setid } = authenticationSlide.actions

export default authenticationSlide.reducer
