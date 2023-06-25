import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CategoryState {
    id: number
    documents: string,
    maritime: string,
    competency: string,
    medical: string,
    offshore: string,
    created_at: string;
    updated_at: string;
}
interface UsersState {
    category: Array<CategoryState>
}

interface UsersState {
    category: CategoryState[];
}

const initialState: UsersState = {
    category: [],
};

// Define the initial state using that type
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setCategory: (state, action: PayloadAction<CategoryState[]>) => {
            state.category = action.payload;
        },
        addCategory: (state, action: PayloadAction<CategoryState>) => {
            state.category.push(action.payload);
        },
        updateCategory: (state, action: PayloadAction<CategoryState>) => {
            const index = state.category.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.category[index] = action.payload;
            }
        },
    },
})

export const { setCategory, addCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer