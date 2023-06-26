import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface MarintimeState {
    id: number
    userId: string,
    job_title: string,
    years: string,
    vessel_type: string,
    client: string,
    employers: string,
    created_at: string,
    updated_at: string
}
interface DocumentsState {
    marintime: Array<MarintimeState>
}

interface DocumentsState {
    marintime: MarintimeState[];
}

const initialState: DocumentsState = {
    marintime: [],
};

// Define the initial state using that type
export const marintimeSlice = createSlice({
    name: 'marintime',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setMarintime: (state, action: PayloadAction<MarintimeState[]>) => {
            state.marintime = action.payload;
        },
        createMarintime: (state, action: PayloadAction<MarintimeState>) => {
            state.marintime.push(action.payload);
        },
        updateMarintime: (state, action: PayloadAction<MarintimeState>) => {
            const index = state.marintime.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.marintime[index] = action.payload;
            }
        },
        deleteMarintime: (state, action: PayloadAction<number>) => {
            const index = state.marintime.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.marintime.splice(index, 1);
            }
        }
    }
})

export const { setMarintime, createMarintime, updateMarintime, deleteMarintime } = marintimeSlice.actions

export default marintimeSlice.reducer