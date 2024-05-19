import { createSlice } from "@reduxjs/toolkit";
import { GPT } from "../types";

interface INITIAL_STATE {
    gpts : {
        [key : string] : GPT
    }
}

const initialState : INITIAL_STATE = {
    gpts : {}
}


const gptsSlice = createSlice({
    name: "gpts",
    initialState,
    reducers: {
        addGpt(state, action: { type: string, payload: { gpt: GPT } }) {
            state.gpts[action.payload.gpt.id] = action.payload.gpt
        },
        deleteGpt(state, action: { type: string, payload: { id: string } }) {
            delete state.gpts[action.payload.id]
        },
        updateGpt(state, action: { type: string, payload: { gpt: GPT } }) {
            state.gpts[action.payload.gpt.id] = action.payload.gpt
        },

    }
})


export const { addGpt, deleteGpt, updateGpt } = gptsSlice.actions
export default gptsSlice.reducer