import { Router } from 'express';
import { google, register, login } from '../controllers/auth.controller';

export class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post('/auth/google', google);
    this.router.post('/auth/register', register);
    this.router.post('/auth/login', login);
  }
}
