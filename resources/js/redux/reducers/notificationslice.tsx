import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import store from '../store'

// Define a type for the slice state
interface NotificationState {
  id:number
  date:string,
  time: string,
  type:number,
  visited:number,
  value:string|null
}
interface NotificationsState{
count:number,
page:number,
value:Array<NotificationState>
}
const initialState: NotificationsState = {
  count:0,
  page:0,
  value:new Array<NotificationState>()
}
export const notificationslice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changecount:(state,action:PayloadAction<number>)=>{
        state.count=action.payload;
    },
    changepage:(state,action:PayloadAction<number>)=>{
        state.page=action.payload;
    },
    changevisited:(state,action:PayloadAction<number>)=>{
        state.value[action.payload].visited=1;
    },
    deccount:(state)=>{
        state.count=state.count-1;
    },
    changedata: (state, action: PayloadAction<[]>) => {
        let array=new Array<NotificationState>();
        state.value.splice(0);
        for(let i =0;i<action.payload.length;i++){
            state.value.push({
                "id":action.payload[i]["id"],
                "time":action.payload[i]["time"],
                "type":action.payload[i]["type"],
                "value":action.payload[i]["value"],
                "date":action.payload[i]["date"],
                "visited":action.payload[i]["visited"]
            });
        }
    }
  },
})

export const { changedata,changecount,changepage,deccount,changevisited} = notificationslice.actions

export default notificationslice.reducer
