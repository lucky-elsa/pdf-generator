import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CrewingState {
    id: number
    company: string,
    country: string,
    how: string,
    filled: boolean,
    comment: string
}
interface UsersState {
    crweing: Array<CrewingState>
}

// Define the initial state using that type
const initialState: UsersState = {
    crweing: new Array<CrewingState>()
}
export const crewingSlice = createSlice({
    name: 'crweing',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        getCrewings: (state, action: PayloadAction<CrewingState>) => {
            state.crweing.push(action.payload);
        },
    },
})

export const { getCrewings } = crewingSlice.actions

export default crewingSlice.reducer