import { Router } from 'express';
import { listResumes, createResume, readResume, updateResume, downloadResume } from '../controllers/resume.controller';

export class ResumeRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/resume/list', listResumes);
    this.router.post('/resume/create', createResume);
    this.router.get('/resume/read/:id', readResume);
    this.router.post('/resume/update/:id', updateResume);
    this.router.get('/resume/download/:id', downloadResume);
  }
}
