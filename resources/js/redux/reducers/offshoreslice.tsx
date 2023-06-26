import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface OffshoreState {
    id: number
    userId: string,
    name: string,
    number: string,
    issue_date: string,
    expiry_date: string,
    created_at: string,
    updated_at: string
}
interface offState {
    offshore: Array<OffshoreState>
}

interface offState {
    offshore: OffshoreState[];
}

const initialState: offState = {
    offshore: [],
};

// Define the initial state using that type
export const offshoreSlice = createSlice({
    name: 'medical',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setOffshore: (state, action: PayloadAction<OffshoreState[]>) => {
            state.offshore = action.payload;
        },
        createOffshore: (state, action: PayloadAction<OffshoreState>) => {
            state.offshore.push(action.payload);
        },
        updateOffshore: (state, action: PayloadAction<OffshoreState>) => {
            const index = state.offshore.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.offshore[index] = action.payload;
            }
        },
        deleteOffshore: (state, action: PayloadAction<number>) => {
            const index = state.offshore.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.offshore.splice(index, 1);
            }
        }
    }
})

export const { setOffshore, createOffshore, updateOffshore, deleteOffshore } = offshoreSlice.actions

export default offshoreSlice.reducer