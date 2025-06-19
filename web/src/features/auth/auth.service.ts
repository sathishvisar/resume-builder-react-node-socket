import { api } from "@/config/axios.config";


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: any;
}


const UserLogin = async function (body: LoginRequest) {
    const { data } = await api.post<LoginResponse>('/auth/login', body)
    return data
}

const GoogleLogin = async function (token: string) {
    const { data } = await api.post<LoginResponse>('/auth/google', {
      token
    })
    return data
}

export const authService = { UserLogin, GoogleLogin };