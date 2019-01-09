import mongoose, { Mongoose } from "mongoose";
import { connect } from "mongodb";
import { IMessage } from "../../../producer/types";
import { Aggregate } from '../../../schemas';
import { Aggregator } from "..";

describe('Aggregator', async () => {
    const testDb = 'aggregate_test';
    const testUrl = "mongodb://localhost:27017/";
    let connection: Mongoose;
    const aggregator  = new Aggregator();
    beforeAll(async () => {
        const connection = await mongoose.connect(testUrl + testDb, { useNewUrlParser: true });
        const message: IMessage = {
            businessId: 'business',
            message: 'Message',
            rating: 3,
            sources: 'amazon',
            type: 'product'
        }

        aggregator.handle(message);
    });
    afterAll(async () => {
        mongoose.connection.db.dropDatabase();
        await connection.disconnect();
    })
    it('Should store the aggregate in the database', async () => {
        const doc = await Aggregate.findOne({ filter: 'kudobuzz_aggregate'});
        expect(doc).toBeDefined();
        // @ts-ignore
        expect(doc.type.product >= 0).toBe(true);
        //@ts-ignore
        expect(doc.type.site >= 0).toBe(true);
        //@ts-ignore
        expect(doc.sources.amazon >= 0).toBe(true);
        //@ts-ignore
        expect(doc.sources.facebook >= 0).toBe(true);
    });
});
// type: {
//     product: Number,
//     site: Number,
// },
// sources: {
//     amazon: Number,
//     facebook: Number
// },
// filter: {
//     type: String,
//     default: 'kudobuzz_aggregates'
// }