import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../configureStore"
const storageName: string = 'userData';
const initialState: UserInitialState = {
    user: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.user = { ...state.user, ...action.payload }
            localStorage.setItem(storageName, JSON.stringify(state.user))
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem(storageName)
        }
    }
})

export const { login, logout } = userSlice.actions
export const select = (state: RootState) => state.user
export default userSlice.reducer