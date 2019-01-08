import { Router, Request, Response } from 'express';

export const Reviews: Router = Router();

Reviews.post('/', (req: Request, res: Response) => {
    //Handles a POST request
});