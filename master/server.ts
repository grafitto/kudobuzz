import express from 'express';
import * as bodyParser from 'body-parser';

import { Reviews } from './routes';

require('dotenv').config();

const loadConfig = () => {
    return {
        port: process.env.MASTER_PORT || 3000
    }
}