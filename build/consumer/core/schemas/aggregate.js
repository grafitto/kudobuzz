"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var AggregateSchema = new mongoose_1.default.Schema({
    type: {
        product: Number,
        site: Number,
    },
    sources: {
        amazon: Number,
        facebook: Number
    },
    filter: {
        type: String,
        default: 'kudobuzz_aggregates'
    }
}, { timestamps: true });
exports.Aggregate = mongoose_1.default.model('Aggregate', AggregateSchema);
