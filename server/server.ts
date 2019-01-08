import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { AggregatesRoutes } from './routes';
import { injectAggregate } from './inject';

require('dotenv').config();

const settings = {
    mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/',
    dbPrefix: process.env.MONGODB_PREFIX || 'kudobuzz_',
    dbName: process.env.MONGODB_NAME || 'aggregates',
    port: process.env.SERVER_PORT || 3002,
    endpoint: process.env.SERVER_ENDPOINT || '/api'
}

console.log(settings.mongoUrl + settings.dbPrefix + settings.dbName);
mongoose.connect(settings.mongoUrl + settings.dbPrefix + settings.dbName, { useNewUrlParser: true });

const app: express.Application = express();

app.use(bodyParser.json());
app.use(injectAggregate);

app.use(settings.endpoint, AggregatesRoutes);

app.listen(settings.port, (err: any) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log(`Server started on port ${settings.port}`);
    }
});