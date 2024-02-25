import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
const initialState: SettingInitialState = {
    isOpen: false
}
const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        handleOpen: (state) => { state.isOpen = true },
        handleClose: (state) => { state.isOpen = false }
    }
})
export const { handleClose, handleOpen } = settingSlice.actions;
export const select = (state: RootState) => state.setting;
export default settingSlice.reducer;