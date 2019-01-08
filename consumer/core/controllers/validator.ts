import { IReview } from "../../types";

export class Validator {
    public ValidateReview(review: IReview) {
        if(typeof review.businessId !== 'string') {
            throw new Error('Business ID must be a string');
        }

        if(typeof review.message !== 'string') {
            throw new Error('Message must be a string');
        }

        if(typeof review.sources !== 'string' && ((review.sources === 'facebook') || 
        (review.sources === 'amazon') || (review.sources === 'kudobuzz'))) {
            throw new Error('Sources must be facebook, amazon or kudobuzz');
        }

        if(typeof review.type !== 'string') {
            throw new Error('Types should be a string');
        }
    }
}