import { useCallback, useMemo } from "react";
import { useAppSelector } from "./app";
export const useHttp = () => {
    const { user } = useAppSelector(state => state.user);
    const headers = useMemo(() => {
        return {
            "Content-Type": "application/json",
            "authorization": `Bearer ${user?.token}`,
            "user": user?.userId ? user?.userId : ""
        }
    }
        , [user])
    const request = useCallback(async (url: string, method = "GET", body?: object) => {
        const bodyData: (object | null) = body ? body : null
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
            method,
            headers,
            body: JSON.stringify(bodyData)
        });
        return await response.json();
    }, [headers]);
    const get = useCallback(async (url: string) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
            method: "GET",
            headers,
        });
        return await response.json();
    }, [headers]);
    const deleteLink = useCallback(async (url: string) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
            method: "DELETE",
            headers,
        });
        return await response.json();
    }, [headers]);
    return { request, get, deleteLink };
};