import { Slave } from "./core/slave";

declare global {
    namespace Express {
        interface Request {
            slave: Slave
        }
    }
}