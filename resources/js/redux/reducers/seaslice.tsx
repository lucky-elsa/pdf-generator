import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface SeaState {
    id: number
    userId: string,
    vessel: string,
    vessel_type: string,
    rank: string,
    contracts: string,
    contract_duration: string,
    description: string,
    created_at: string,
    updated_at: string
}
interface seasState {
    sea: Array<SeaState>
}

interface seasState {
    sea: SeaState[];
}

const initialState: seasState = {
    sea: [],
};

// Define the initial state using that type
export const seaSlice = createSlice({
    name: 'medical',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setSea: (state, action: PayloadAction<SeaState[]>) => {
            state.sea = action.payload;
        },
        createSea: (state, action: PayloadAction<SeaState>) => {
            state.sea.push(action.payload);
        },
        updateSea: (state, action: PayloadAction<SeaState>) => {
            const index = state.sea.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.sea[index] = action.payload;
            }
        },
        deleteSea: (state, action: PayloadAction<number>) => {
            const index = state.sea.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.sea.splice(index, 1);
            }
        }
    }
})

export const { setSea, createSea, updateSea, deleteSea } = seaSlice.actions

export default seaSlice.reducer