import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import { handleError } from './app/middlewares/error';


const routes = new Router();

routes.post('/sessions', asyncHandler(SessionController.store));

routes.use(authMiddleware);
routes.post('/users', asyncHandler((...args) => UserController.create(...args)));
routes.put('/users/:id', asyncHandler((...args) => UserController.update(...args)));
routes.use(handleError);


export default routes;
