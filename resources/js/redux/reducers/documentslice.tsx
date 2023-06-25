import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface DocumentState {
    id: number
    userId: string,
    document_type: string,
    country: string,
    number: string,
    issue_date: string,
    expiration_date: string,
    created_at: string,
    updated_at: string
}
interface DocumentsState {
    document: Array<DocumentState>
}

interface DocumentsState {
    document: DocumentState[];
}

const initialState: DocumentsState = {
    document: [],
};

// Define the initial state using that type
export const documentSlice = createSlice({
    name: 'document',
    initialState,
    // `createSlice` will infer the state type from the `initialState` argument
    reducers: {
        setDocument: (state, action: PayloadAction<DocumentState[]>) => {
            state.document = action.payload;
        },
        createDocument: (state, action: PayloadAction<DocumentState>) => {
            state.document.push(action.payload);
        },
        updateDocument: (state, action: PayloadAction<DocumentState>) => {
            const index = state.document.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.document[index] = action.payload;
            }
        },
        deleteDocument: (state, action: PayloadAction<DocumentState>) => {
            const index = state.document.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.document.splice(index, 1);
            }
        }
    }
})

export const { setDocument, createDocument, updateDocument, deleteDocument } = documentSlice.actions

export default documentSlice.reducer