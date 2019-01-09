import { Router, Request, Response } from 'express';

export const Reviews: Router = Router();

Reviews.post('/reviews', (req: Request, res: Response) => {
    //Receive reviews from different places, sends them to the slave
    req.slave.send(req.body).then((response: any) => {
        res.send({ success: true });
    }).catch((error: any) => {
        res.status(406).end(error.message);
    });
});