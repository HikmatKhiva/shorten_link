export const auth = async (path: string, data: AuthData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        const user = await response.json();
        if (!response.ok) {
            return user?.message ? user.message : "something went wrong";
        }
        return user;
    } catch (error) {
        return { error, status: 500 }
    }
}