
//when you log in
export interface LoginCredentials {
    username: string;
    password: string;
}
//是登录后存在前端 context 里的用户信息。
export interface AuthUser{
    id: number;
    username:string;
    email:string;
    firstName :string;
    lastName: string;
    gender: string;
}
// DummyJSON returned value，比 AuthUser 多两个 token。
export interface LoginResponse extends AuthUser{
    accessToken: string;
    refreshToken: string;
}