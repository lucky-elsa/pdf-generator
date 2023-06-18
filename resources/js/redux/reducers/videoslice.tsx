import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface VideoState {
    image: string,
    title: string,
    type:number
}
interface VideoStates {
    value:Array<VideoState>,
}
const initialState: VideoStates = {
    value: new Array<VideoState>(),
}
export const videoslice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        loadvideos: (state, action: PayloadAction<[]>) => {
            state.value.splice(0);
            for (let i = 0; i < action.payload.length; i++) {
                state.value.push({
                    image:action.payload[i]["value"],
                    title:action.payload[i]["title"],
                    type:action.payload[i]["type"],
                }
                );
            }
        },
    }

})

export const { loadvideos, } = videoslice.actions

export default videoslice.reducer
