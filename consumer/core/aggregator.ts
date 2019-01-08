import { IReview } from "../types";
import { Aggregate } from "../../schemas";

export class Aggregator {

    public async handle(review: IReview): Promise<any> {
        if(review.sources !== 'kudobuzz') {
            const { type, sources } = this.getIncrements(review);
            return await Aggregate.findOneAndUpdate(
                { filter: 'kudobuzz_aggregate' },
                { 
                    $inc: {
                        'type.product': type.product,
                        'type.site': type.site,
                        'sources.amazon': sources.amazon,
                        'sources.facebook': sources.facebook
                    }
                },
                {
                    upsert: true
                }
            );
        } else {
            return Promise.resolve({ message: 'Messages from kudobuzz are filtered out'});
        }
    }

    private getIncrements(review: IReview) {
        return {
            type: {
                product: review.type === 'product'?1:0,
                site: review.type === 'site'?1:0
            },
            sources: {
                amazon: review.sources === 'amazon'?1:0,
                facebook: review.sources === 'facebook'?1:0
            }
        }
    }
    
}