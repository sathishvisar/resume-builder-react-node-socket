import { createSlice } from '@reduxjs/toolkit'
import { UserInfo } from './userThunks';


interface UserState {
  userInfo: null | { _id: string; firstname: string; lastname: string; email: string; picture: string; } | any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(UserInfo.pending, (s) => { s.status = 'loading'; })
        .addCase(UserInfo.fulfilled, (s, a) => {
            s.userInfo = a.payload
            s.status = 'succeeded';
        })
        .addCase(UserInfo.rejected, (s, a) => {
            s.status = 'failed'
            s.error = a.error.message || 'Login Failed'
        })
    }
})

// export const { logout } = authSlice.actions
export default userSlice.reducer