// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { userInfo } from '../services/userService';


export const info = async (req: Request, res: Response) => {
  try{
    const user_info = await userInfo(req, res)
    console.log('user_info', user_info)
    res.status(200).json(user_info);
  }catch(error: any){
    res.status(401).json({ error: error.message });
  }
}