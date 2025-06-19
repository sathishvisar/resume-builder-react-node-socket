// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { list, create, update, preview, download } from '../services/resumeService';


export const listResumes = async (req: Request, res: Response) => {
  try{
    const result = await list(req, res)
    res.status(200).json(result);
  }catch(error: any){
    res.status(401).json({ error: error.message });
  }
}

export const createResume = async (req: Request, res: Response) => {
  try{
    const result = await create(req, res)
    res.status(200).json(result);
  }catch(error: any){
    res.status(401).json({ error: error.message });
  }
}

export const updateResume = async (req: Request, res: Response) => {
  try{
    const result = await update(req, res)
    res.status(200).json(result);
  }catch(error: any){
    res.status(401).json({ error: error.message });
  }
}

export const downloadResume = async (req: Request, res: Response) => {
  try{
    const pdfBuffer = await preview(req, res)
    res.writeHead(200, {
      'Content-Type': 'application/pdf',             // tell browser it’s a PDF
      'Content-Length': pdfBuffer.length,            // optional but nice
      // Swap “inline” for “attachment” to force a download dialog
      'Content-Disposition': 'inline; filename="report.pdf"',
    });
    res.end(pdfBuffer); 
    // res.status(200).json(result);
  }catch(error: any){
    res.status(401).json({ error: error.message });
  }
}