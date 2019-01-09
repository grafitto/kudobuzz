import { IAggregate } from "../types";
import { Aggregate } from '../../schemas';

export class Aggregates {
    public async fetch(): Promise<any> {
        const doc = await Aggregate.findOne({ filter: 'kudobuzz_aggregate' });
        if(doc) {
            return this.formatAggregate(doc);
        }
        throw new Error('Aggregate not found');
    }

    private formatAggregate(doc: any): IAggregate {
        return {
            sources: {
                amazon: {
                    count: doc.sources.amazon,
                    percentage: (doc.sources.amazon / (doc.sources.amazon + doc.sources.facebook)) * 100
                },
                facebook: {
                    count: doc.sources.facebook,
                    percentage: (doc.sources.facebook / (doc.sources.amazon + doc.sources.facebook)) * 100
                }
            },
            types: {
                product: {
                    count: doc.type.product,
                    percentage: (doc.type.product / (doc.type.product + doc.type.site)) * 100,
                },
                site: {
                    count: doc.type.site,
                    percentage: (doc.type.site / (doc.type.product + doc.type.site)) * 100
                }
            }
        }
    }
}