type InputPassword = "text" | "password"
type User = {
    token?: string | null;
    userId?: string | null;
    name?: string | null;
}
type SettingInitialState = {
    isOpen: boolean
}
type UserInitialState = {
    user: User | null
};
type NavLink = {
    id: number;
    path: string;
    title: string;
}
type Link = {
    link_from: string;
    link_to: string;
    link_code: string;
    date_time: string;
    clicks: string;
    owner: number;
    id: number;
}
type LoginPayload = {
    type: string,
    payload: User
}
type AuthData = {
    name?: string
    email?: string
    password?: string
}