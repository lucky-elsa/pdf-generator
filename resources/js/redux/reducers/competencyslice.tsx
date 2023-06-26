import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CompetencyState {
    id: number
    userId: string,
    name: string,
    number: string,
    issue_date: string,
    expiry_date: string,
    created_at: string,
    updated_at: string
}
interface ComState {
    competency: Array<CompetencyState>
}

interface ComState {
    competency: CompetencyState[];
}

const initialState: ComState = {
    competency: [],
};

// Define the initial state using that type
export const competencySlice = createSlice({
    name: 'competency',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setCompetency: (state, action: PayloadAction<CompetencyState[]>) => {
            state.competency = action.payload;
        },
        createCompetency: (state, action: PayloadAction<CompetencyState>) => {
            state.competency.push(action.payload);
        },
        updateCompetency: (state, action: PayloadAction<CompetencyState>) => {
            const index = state.competency.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.competency[index] = action.payload;
            }
        },
        deleteCompetency: (state, action: PayloadAction<number>) => {
            const index = state.competency.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.competency.splice(index, 1);
            }
        }
    }
})

export const { setCompetency, createCompetency, updateCompetency, deleteCompetency } = competencySlice.actions

export default competencySlice.reducer