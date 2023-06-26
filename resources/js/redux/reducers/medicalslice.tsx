import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface MedicalState {
    id: number
    userId: string,
    name: string,
    number: string,
    issue_date: string,
    expiry_date: string,
    created_at: string,
    updated_at: string
}
interface MedState {
    medical: Array<MedicalState>
}

interface MedState {
    medical: MedicalState[];
}

const initialState: MedState = {
    medical: [],
};

// Define the initial state using that type
export const medicalSlice = createSlice({
    name: 'medical',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setMedical: (state, action: PayloadAction<MedicalState[]>) => {
            state.medical = action.payload;
        },
        createMedical: (state, action: PayloadAction<MedicalState>) => {
            state.medical.push(action.payload);
        },
        updateMedical: (state, action: PayloadAction<MedicalState>) => {
            const index = state.medical.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.medical[index] = action.payload;
            }
        },
        deleteMedical: (state, action: PayloadAction<number>) => {
            const index = state.medical.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.medical.splice(index, 1);
            }
        }
    }
})

export const { setMedical, createMedical, updateMedical, deleteMedical } = medicalSlice.actions

export default medicalSlice.reducer