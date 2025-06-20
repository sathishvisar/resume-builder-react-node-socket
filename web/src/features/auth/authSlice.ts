import { createSlice } from '@reduxjs/toolkit'
import { UserLogin, GoogleBtnLogin, UserRegister } from './authThunks';

const TOKEN_KEY = 'access_token'

interface AuthState {
//   token: string | null;
  user: null | { id: string; name: string; email: string };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// const initialToken = localStorage.getItem(TOKEN_KEY);

const initialState: AuthState = {
//   token: initialToken,
  user: null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            // state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        }
    },
    extraReducers: (builder) => {
        builder
        /*  ─── User / password login ─── */
        .addCase(UserLogin.pending, (s) => { s.status = 'loading'; })
        .addCase(UserLogin.fulfilled, (s, a) => {
            s.status = 'succeeded'
        })
        .addCase(UserLogin.rejected, (s, a) => {
            s.status = 'failed'
            s.error = a.error.message || 'Login Failed'
        })

        /*  ─── Google login ─── */
        .addCase(GoogleBtnLogin.pending,   (s) => { s.status = 'loading'; })
        .addCase(GoogleBtnLogin.fulfilled, (s, a) => {
            s.status = 'succeeded'
        })
        .addCase(GoogleBtnLogin.rejected,  (s, a) => {
            s.status = 'failed'
            s.error  = a.error.message || 'Google login failed'
        })

        /*  ─── User Register ─── */
        .addCase(UserRegister.pending, (s) => {s.status = 'loading'})
        .addCase(UserRegister.fulfilled, (s, a) => {
            s.status = 'succeeded'
        })
        .addCase(UserRegister.rejected,  (s, a) => {
            s.status = 'failed'
            s.error  = a.error.message || 'Google login failed'
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer