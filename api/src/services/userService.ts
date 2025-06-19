import { Request, Response } from 'express';


export const userInfo = async (req: Request, res: Response) => {
    return req.user
}