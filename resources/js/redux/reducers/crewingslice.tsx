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
    crewing: Array<CrewingState>
}

interface UsersState {
    crewing: CrewingState[];
}

const initialState: UsersState = {
    crewing: [],
};

// Define the initial state using that type
export const crewingSlice = createSlice({
    name: 'crewing',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setCrweings: (state, action: PayloadAction<CrewingState[]>) => {
            state.crewing = action.payload;
        },
        addCrweing: (state, action: PayloadAction<CrewingState>) => {
            state.crewing.push(action.payload);
        },
        updateCrweing: (state, action: PayloadAction<CrewingState>) => {
            const index = state.crewing.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.crewing[index] = action.payload;
            }
        },
    },
})

export const { setCrweings, addCrweing, updateCrweing } = crewingSlice.actions

export default crewingSlice.reducer