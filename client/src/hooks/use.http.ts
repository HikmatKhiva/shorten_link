import { useCallback } from "react";
import { useAppSelector } from "./app";
export const useHttp = () => {

    const { user } = useAppSelector(state => state.user);
    const request = useCallback(async (url: string, method = "GET", body?: object | any) => {
        try {
            if (body !== null && typeof body === 'object') {
                body = JSON.stringify(body);
            }

            const response = await fetch(import.meta.env.VITE_BACKEND_URL + url, {
                method,
                body,
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${user?.token}`,
                    "user": user?.userId ? user?.userId : ""
                },
            });

            return await response.json()

        } catch (error) {
            throw error;
        }
    }, [user?.token, user?.userId]);
    return { request };
};