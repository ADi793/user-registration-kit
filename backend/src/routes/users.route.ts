import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto, GetUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.post(`${this.path}/info`, validationMiddleware(GetUserDto, 'body'), this.usersController.getUserByEmail);
  }
}

export default UsersRoute;
