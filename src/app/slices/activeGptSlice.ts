import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id : ""
}


const activeGptSlice = createSlice({
    name : "activeGpt",
    initialState,
    reducers : {
        setActiveGpt(state, action : {type : string, payload : {id : string}}){
            state.id = action.payload.id
        }
    }
})

export const {setActiveGpt} = activeGptSlice.actions
export default activeGptSlice.reducer