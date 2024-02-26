export const auth = async (url: string, data: AuthData) => {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    const user = await response.json();
    if (!response.ok) {
        return user?.message;
    }
    return user;
}