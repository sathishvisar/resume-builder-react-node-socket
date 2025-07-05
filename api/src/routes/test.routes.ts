import { Router } from 'express';
import { ping } from '../controllers/test.controller';

export class TestRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/test/ping', ping);
  }
}
