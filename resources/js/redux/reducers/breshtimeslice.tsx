import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import store from '../store'

// Define a type for the slice state
interface BreshtimeState {
  id:number
  time: string,
}
interface BreshtimesState{
    date:Date,
    value:Array<BreshtimeState>
}
// Define the initial state using that type
const initialState: BreshtimesState = {
  date: new Date(),
  value:new Array<BreshtimeState>()
}
export const breshtimeslice = createSlice({
  name: 'breshtime',
  initialState,
  reducers: {
    changedata: (state, action: PayloadAction<[]>) => {
        state.value.splice(0);
        for(let i =0;i<action.payload.length;i++){
            state.value.push({
                "id":action.payload[i]["id"],
                "time":action.payload[i]["time"],
            });
        }
    },
    removeindex: (state, action: PayloadAction<number>) => {
        state.value.splice(action.payload,1);
    }
  },
})

export const { changedata,removeindex} = breshtimeslice.actions

export default breshtimeslice.reducer
