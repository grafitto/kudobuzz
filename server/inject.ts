import { Request, Response, NextFunction } from "express";
import { Aggregates } from "./core/aggregates";

export function injectAggregate (req: Request, res: Response, next: NextFunction) {
    const aggregates = new Aggregates();
    req.aggregates = aggregates;
    next();
}