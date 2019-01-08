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
var mongoose_1 = __importDefault(require("mongoose"));
var bodyParser = __importStar(require("body-parser"));
var routes_1 = require("./routes");
var inject_1 = require("./inject");
require('dotenv').config();
var settings = {
    mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/',
    dbPrefix: process.env.MONGODB_PREFIX || 'kudobuzz_',
    dbName: process.env.MONGODB_NAME || 'aggregates',
    port: process.env.SERVER_PORT || 3002,
    endpoint: process.env.SERVER_ENDPOINT || '/api'
};
console.log(settings.mongoUrl + settings.dbPrefix + settings.dbName);
mongoose_1.default.connect(settings.mongoUrl + settings.dbPrefix + settings.dbName, { useNewUrlParser: true });
var app = express_1.default();
app.use(bodyParser.json());
app.use(inject_1.injectAggregate);
app.use(settings.endpoint, routes_1.AggregatesRoutes);
app.listen(settings.port, function (err) {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Server started on port " + settings.port);
    }
});
