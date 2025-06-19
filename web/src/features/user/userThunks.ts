import { createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from './userService';

export const UserInfo = createAsyncThunk(
    'user/info', 
    async () => {
        const { user } = await userService.UserInfo()
        return { user };
    }
)

