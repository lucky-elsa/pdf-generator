import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface IndexType {
  value: number
}

// Define the initial state using that type
const initialState: IndexType = {
  value: 0,
}

export const selectSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    changeByAmount: (state, action: PayloadAction<number>) => {
        localStorage.setItem('index', action.payload.toString())
      state.value = action.payload
    },
  },
})

export const {changeByAmount } = selectSlice.actions

export default selectSlice.reducer
