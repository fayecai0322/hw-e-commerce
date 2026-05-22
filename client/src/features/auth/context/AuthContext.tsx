import { createContext, useState, useMemo, useContext, type ReactNode} from "react";
import type { AuthUser,LoginCredentials } from "../types";
// import { IconSortAscendingNumbers } from "@tabler/icons-react";
import { loginUser } from "../api/authApi";

interface AuthContextValue {
    user: AuthUser | null;
    token: string |null ;
    isAuthenticated: boolean;
    login : (Credentials: LoginCredentials) => Promise<void>;
    logout: ()=> void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USER_STORAGE_KEY = "authUser";
const TOKEN_STORAGE_KEY = "token";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps)=>{
    // Store the current user in React state.
    // The function inside useState runs only once on initial render.
    // It tries to restore the user from localStorage after page refresh.
    const [user, setUser] = useState<AuthUser | null>(()=>{
        const storedUser = localStorage.getItem(USER_STORAGE_KEY); //fetch the localStorage with key name = "authUser"
        return storedUser ? JSON.parse(storedUser): null;
    });

    const [token, setToken] = useState<string |null>(()=>{
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    });

    const isAuthenticated = Boolean(user && token);

    //authenticate post to dummy 
    const login = async (credentials : LoginCredentials)=>{
        const response = await loginUser(credentials);
    
        const authUser: AuthUser = {
            id: response.id,
            username: response.username,
            email: response.email,
            firstName : response.firstName,
            lastName : response.lastName,
            gender: response.gender,
        }
        setUser(authUser);
        setToken(response.accessToken);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
        localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken);
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refreshToken);
    };

    const logout = ()=> {
        setUser(null);
        setToken(null);

        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    };
    // Memoize the context value.
    // This prevents creating a new value object on every render unless dependencies change.
      const value = useMemo(
        () => ({
        user,
        token,
        isAuthenticated,
        login,
        logout,
        }),
        [user, token, isAuthenticated],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };
    // Custom hook for using auth context in components.
    export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}