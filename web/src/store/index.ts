import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '@/features/auth/authSlice'
import userReducer from '@/features/user/userSlice'
import resumeReducer from '@/features/resume/resumeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        resume: resumeReducer
    },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;