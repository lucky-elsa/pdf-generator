import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CrewingState {
    id: number
    company: string,
    country: string,
    how: string,
    filled: boolean,
    comment: string,
    created_at: string;
    updated_at: string;
}
interface UsersState {
    crweing: Array<CrewingState>
}

interface UsersState {
    crweing: CrewingState[];
}

const initialState: UsersState = {
    crweing: [],
};

// Define the initial state using that type
export const crewingSlice = createSlice({
    name: 'crweing',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        // createCrewings: (state, action: PayloadAction<CrewingState>) => {
        //     state.crweing.push(action.payload);
        // },
        // getCewings: (state, action: PayloadAction<CrewingState>) => {
        //     state.crweing.push(action.payload);
        // },
        setCrweings: (state, action: PayloadAction<CrewingState[]>) => {
            state.crweing = action.payload;
        },
        addCrweing: (state, action: PayloadAction<CrewingState>) => {
            state.crweing.push(action.payload);
        },
        updateCrweing: (state, action: PayloadAction<CrewingState>) => {
            const index = state.crweing.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.crweing[index] = action.payload;
            }
        },
    },
})

export const { setCrweings, addCrweing, updateCrweing } = crewingSlice.actions

export default crewingSlice.reducer