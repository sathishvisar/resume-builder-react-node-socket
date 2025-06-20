import { createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from './userService';

export const UserInfo = createAsyncThunk(
    'user/info', 
    async () => {
        return await userService.UserInfo()
    }
)

