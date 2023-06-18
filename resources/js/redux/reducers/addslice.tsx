import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface IndexType {
  value: Date
}

// Define the initial state using that type
const initialState: IndexType = {
  value: new Date(),
}

export const addslice = createSlice({
  name: 'adddate',
  initialState,
  reducers: {
    changeDate: (state, action: PayloadAction<Date>) => {
      state.value = action.payload
    },
  },
})

export const {changeDate } = addslice.actions

export default addslice.reducer
