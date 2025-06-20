import { createSlice } from '@reduxjs/toolkit'
import { ListResume, ReadResume } from './resumeThunks';


interface ResumeState {
  List: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;

  resume_data: any;
  resume_status: 'idle' | 'loading' | 'succeeded' | 'failed';
  resume_error: any;
}

const initialState: ResumeState = {
  List: [],
  status: 'idle',
  error: null,
  resume_data: null,
  resume_status: 'idle',
  resume_error: null
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(ListResume.pending, (s) => { s.status = 'loading'; })
        .addCase(ListResume.fulfilled, (s, a) => {
            s.List = a.payload
            s.status = 'succeeded';
        })
        .addCase(ListResume.rejected, (s, a) => {
            s.status = 'failed'
            s.error = a.error.message || 'Api Failed'
        })

        .addCase(ReadResume.pending, (s) => { s.resume_status = 'loading'; })
        .addCase(ReadResume.fulfilled, (s, a) => {
            s.resume_data = a.payload
            s.resume_status = 'succeeded';
        })
        .addCase(ReadResume.rejected, (s, a) => {
            s.resume_status = 'failed'
            s.resume_error = a.error.message || 'Api Failed'
        })
    }
})

// export const { logout } = authSlice.actions
export default resumeSlice.reducer