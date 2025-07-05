import { Request, Response } from 'express';


export const ping = async (req: Request, res: Response) => {
  try{
    res.send(`Handled by process ${process.pid}`);
  }catch(error: any){
    res.status(401).json({ error: error.message });
  }
}