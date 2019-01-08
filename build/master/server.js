"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var routes_1 = require("./routes");
var inject_1 = require("./inject");
require('dotenv').config();
var loadConfig = function () {
    return {
        port: process.env.MASTER_PORT || 3000,
        endpoint: process.env.MASTER_ENDPOINT || '/api'
    };
};
var settings = loadConfig();
var app = express_1.default();
app.use(bodyParser.json());
//Inject slave object into request object
app.use(inject_1.injectSlave);
//API endpoints
app.use(settings.endpoint, routes_1.Reviews);
app.listen(settings.port, function () {
    console.log("Master listening on port " + settings.port);
});
