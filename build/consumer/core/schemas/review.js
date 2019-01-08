"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ReviewSchema = new mongoose_1.default.Schema({
    businessId: String,
    message: String,
    type: String,
    sources: {
        type: String,
        enum: ['amazon', 'facebook', 'kudobuzz']
    }
}, { timestamps: true });
exports.Review = mongoose_1.default.model('Review', ReviewSchema);
