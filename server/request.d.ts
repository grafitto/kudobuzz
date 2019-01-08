import { Aggregates } from "./core/aggregates";

declare global {
    namespace Express {
        interface Request {
            aggregates: Aggregates
        }
    }
}