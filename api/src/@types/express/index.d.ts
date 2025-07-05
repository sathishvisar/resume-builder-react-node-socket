import multer from 'multer';

declare global {
  namespace Express {
    interface Request {
      category?: string | undefined;
      user?: any;
      // file?: Express.Multer.File;
      // files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];
    }
  }
}