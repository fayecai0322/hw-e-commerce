import type { LoginCredentials, LoginResponse } from "../types";

const AUTH_API_URL = "https://dummyjson.com/auth";

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> =>{
    const response = await fetch(`${AUTH_API_URL}/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...credentials,
            expiresInMins: 30,
        }),
        // credentials:"include"
    });

    if (!response.ok){
        throw new Error("Invalid username or password");
    }
    return response.json();
};