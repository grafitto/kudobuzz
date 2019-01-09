import { Router, Request, Response } from 'express';
import { IAggregate } from '../types';

export const AggregatesRoutes: Router = Router();

AggregatesRoutes.get('/aggregates', (req: Request, res: Response) => {
    req.aggregates.fetch().then((response: any) => {
        res.send(response);
    }).catch((err: any) => {
        res.status(504).end(err.message);
    })
});