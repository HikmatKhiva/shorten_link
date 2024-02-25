import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/userSlice";
import setting from "./slice/settingSlice"
let userData = null;
if (typeof window !== "undefined") {
    userData = window?.localStorage.getItem("userData");
}
const parsedUser: User = userData ? JSON.parse(userData) : null;
export const store = configureStore({
    reducer: {
        user,
        setting
    },
    preloadedState: {
        user: { user: parsedUser }
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;