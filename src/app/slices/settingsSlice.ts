// Import the createSlice from redux-toolit
import { createSlice } from "@reduxjs/toolkit";

// Import the type for Settings
import { SETTINGS } from "../types";

// Set the initialState for settings
const initialState  : SETTINGS = {
    key : "",
    mode : ""
}

const settingsSlice = createSlice({
    name : "settings",
    initialState, 
    reducers : {
        updateSettings(_ , action : {type : string, payload : {newSettings : SETTINGS}}){
            return action.payload.newSettings
        }
    }
})

export const {updateSettings} = settingsSlice.actions
export default settingsSlice.reducer