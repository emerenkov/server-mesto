import { Request, Response, Router } from 'express';
import userRouter from './users';

const routes = Router();

routes.use('/users', userRouter);

routes.use((req:Request, res:Response)=> res.status(404).send('page not () found'))

export default routes;
