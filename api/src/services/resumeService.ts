import { Request, Response } from 'express';
import Resume, { IResume } from "../models/Resume";
import { BuildResume } from './pdfService'

export const list = async (req: Request, res: Response) => {
    const resumes = await Resume
        .find({user: req.user._id})
        // .populate({
        //     path: 'user',
        //     select: 'firstname lastname picture',
        // })
        // .lean(); 
    return resumes
}

export const create = async (req: Request, res: Response) => {
    const newResume = await Resume.create({
        user: req.user._id
    });
    return newResume
}


export const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resume = await Resume.findById({_id: id})
    if (!resume) throw new Error("Invalid Resume ID");
    return resume
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;
    const resume = await Resume.findById({_id: id})
    if (!resume) throw new Error("Invalid Resume ID");
    resume.data = data
    resume.save()
}

export const preview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resume = await Resume.findById({_id: id})
    if (!resume) throw new Error("Invalid Resume ID");
    return await BuildResume(resume.data || {})
}

export const download = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resume = await Resume.findById({_id: id})
    if (!resume) throw new Error("Invalid Resume ID");
    return resume
}