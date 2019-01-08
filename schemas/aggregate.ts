import mongoose from 'mongoose';

let AggregateSchema = new mongoose.Schema({
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
},{ timestamps: true });

export const Aggregate = mongoose.model('Aggregate', AggregateSchema);