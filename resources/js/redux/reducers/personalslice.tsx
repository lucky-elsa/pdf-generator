import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import store from '../store'

// Define a type for the slice state
interface PersonalState {
    id: number
    userId: string,
    name: string,
    surname: string,
    citizen: string | null,
    country: string,
    phone: number | null,
    airport: string,
    email: string,
    birthday: string,
    gender: string,
    link: string,
    created_at: string,
    updated_at: number
}
interface MedState {
    personal: Array<PersonalState>
}

interface MedState {
    personal: PersonalState[];
}

const initialState: MedState = {
    personal: [],
};

export const personalSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPersonal: (state, action: PayloadAction<PersonalState[]>) => {
            state.personal = action.payload;
        },
        createPersonal: (state, action: PayloadAction<PersonalState>) => {
            state.personal.push(action.payload);
        },
        updatePersonal: (state, action: PayloadAction<PersonalState>) => {
            const index = state.personal.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.personal[index] = action.payload;
            }
        }
    }
})

export const { setPersonal, createPersonal, updatePersonal } = personalSlice.actions

export default personalSlice.reducer
