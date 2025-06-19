import { createSlice } from '@reduxjs/toolkit'
import { UserInfo } from './userThunks';

const TOKEN_KEY = 'access_token'

interface UserState {
  user: null | { id: string; name: string; email: string } | any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// const initialToken = localStorage.getItem(TOKEN_KEY);

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(UserInfo.pending, (s) => { s.status = 'loading'; })
        .addCase(UserInfo.fulfilled, (s, a) => {
            s.status = 'succeeded'
            s.user = a.payload
        })
        .addCase(UserInfo.rejected, (s, a) => {
            s.status = 'failed'
            s.error = a.error.message || 'Login Failed'
        })
    }
})

// export const { logout } = authSlice.actions
export default authSlice.reducer