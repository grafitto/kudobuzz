import { Request, Response, NextFunction } from "express";
import { Slave } from "./core/slave";

export function injectSlave(req: Request, res: Response, next: NextFunction) {
    const slave: Slave = new Slave(
                                process.env.MASTER_RABBITMQ_ENDOINT || 'amqp://localhost',
                                process.env.AMQP_QUEUE || 'kb-new-review-topic'
                            );
    req.slave = slave;
    next();
}