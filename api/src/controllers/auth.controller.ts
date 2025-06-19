// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { googleAuth, registerUser, loginUser } from '../services/authService';


export const google = async (req: Request, res: Response) => {
  try{
    await googleAuth(req, res);
  }catch(error: any){
    res.status(401).json({ error: error.message });
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};