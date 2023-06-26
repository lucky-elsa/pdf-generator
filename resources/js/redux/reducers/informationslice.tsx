import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface InformationState {
    id: number
    userId: string,
    languages: string,
    computer: string,
    add_skills: string,
    created_at: string,
    updated_at: string
}
interface infoState {
    information: Array<InformationState>
}

interface infoState {
    information: InformationState[];
}

const initialState: infoState = {
    information: [],
};

// Define the initial state using that type
export const informationSlice = createSlice({
    name: 'medical',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setInfomation: (state, action: PayloadAction<InformationState[]>) => {
            state.information = action.payload;
        },
        createInfomation: (state, action: PayloadAction<InformationState>) => {
            state.information.push(action.payload);
        },
        updateInfomation: (state, action: PayloadAction<InformationState>) => {
            const index = state.information.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.information[index] = action.payload;
            }
        },
        deleteInfomation: (state, action: PayloadAction<number>) => {
            const index = state.information.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.information.splice(index, 1);
            }
        }
    }
})

export const { setInfomation, createInfomation, updateInfomation, deleteInfomation } = informationSlice.actions

export default informationSlice.reducer