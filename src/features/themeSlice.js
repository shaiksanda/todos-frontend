import { createSlice } from "@reduxjs/toolkit";
import { themes } from '../themes';
const initialState={
    theme:themes.coral
}

const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.theme=action.payload
        }
    }
})

export const {setTheme}=themeSlice.actions

export default themeSlice.reducer;