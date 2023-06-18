import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import store from '../store'

// Define a type for the slice state
interface DataState {
  id:number
  time: string,
  type:number,
  value:string|null,
  date:string|null,
  updated_at:string
}
interface DatasState{
    date:Date,
    value:Array<DataState>
}
interface Datachindex{
    data:DataState,
    index:number
}
// Define the initial state using that type
const initialState: DatasState = {
  date: new Date(),
  value:new Array<DataState>()
}
export const dataslice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changedate: (state, action: PayloadAction<Date>) => {
      state.date=action.payload;
      localStorage.setItem('date',action.payload.toString());
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    changedata: (state, action: PayloadAction<[]>) => {
        let array=new Array<DataState>();
        state.value.splice(0);
        for(let i =0;i<action.payload.length;i++){
            state.value.push({
                "id":action.payload[i]["id"],
                "time":action.payload[i]["time"],
                "type":action.payload[i]["type"],
                "value":action.payload[i]["value"],
                "date":action.payload[i]["date"],
                "updated_at":action.payload[i]["updated_at"],
            });
        }
    },
    changedataindex: (state, action: PayloadAction<Datachindex> ) => {
        state.value[action.payload.index]=action.payload.data;

    },
  },
})

export const { changedata, changedate,changedataindex} = dataslice.actions

export default dataslice.reducer
