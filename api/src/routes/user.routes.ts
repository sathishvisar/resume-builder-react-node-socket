import { Router } from 'express';
import { info } from '../controllers/user.controller';
import {auth} from './../middleware/auth'

export class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get('/user/info', auth, info);
  }
}
