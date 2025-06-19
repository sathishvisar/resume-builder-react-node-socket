import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService, LoginRequest } from './auth.service';

export const UserLogin = createAsyncThunk(
    'auth/login', 
    async (credentials: LoginRequest) => {
        const { user } = await authService.UserLogin(credentials)
        return { user };
    }
)


export const GoogleBtnLogin = createAsyncThunk(
    'auth/google', 
    async (token: string) => {
        const { user } = await authService.GoogleLogin(token)
        return { user };
    }
)