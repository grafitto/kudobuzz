import { IMessage } from "../types";

export class Validator {
    public ValidateMessage(review: IMessage) {
        if(typeof review.businessId !== 'string') {
            throw new Error('Business ID must be a string');
        }

        if(typeof review.message !== 'string') {
            throw new Error('Message must be a string');
        }

        if(typeof review.sources !== 'string' || ((review.sources !== 'facebook') &&
        (review.sources !== 'amazon') && (review.sources !== 'kudobuzz'))) {
            throw new Error('Sources must be a string containing \'facebook\', \'amazon\' or \'kudobuzz\'');
        }

        if(typeof review.type !== 'string' || ((review.type !== 'product' && review.type !== 'site'))) {
            throw new Error('Types should be a string containing \'product\' or \'site\'');
        }
        
        if(typeof review.rating !== 'number' || review.rating < 1 || review.rating > 5) {
            throw new Error('Rating must be a number');
        }
    }
}