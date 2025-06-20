import { createAsyncThunk } from '@reduxjs/toolkit'
import { resumeService } from './resumeService';

export const ListResume = createAsyncThunk(
    'resume/list', 
    async () => {
        return await resumeService.List()
    }
)

export const CreateResume = createAsyncThunk(
    'resume/create', 
    async () => {
        return await resumeService.Create()
    }
)


export const ReadResume = createAsyncThunk(
    'resume/read', 
    async (id: string) => {
        return await resumeService.Read(id)
    }
)

export const UpdateResume = createAsyncThunk(
    'resume/update', 
    async (id: string) => {
        return await resumeService.Update(id)
    }
)