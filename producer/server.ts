import express from 'express';
import * as bodyParser from 'body-parser';

import { Reviews } from './routes';
import { injectSlave } from './inject';

require('dotenv').config();

const loadConfig = () => {
    return {
        port: process.env.MASTER_PORT || 3000,
        endpoint: process.env.MASTER_ENDPOINT || '/api'
    }
};

const settings: any = loadConfig();
const app: express.Application = express();

app.use(bodyParser.json());

//Inject slave object into request object
app.use(injectSlave);

//API endpoints
app.use(settings.endpoint, Reviews);


app.listen(settings.port, () => {
    console.log(`Master listening on port ${settings.port}`);
});