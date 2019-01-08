import { Validator } from ".";
import { IReview } from "../../types";

export class Aggregator {
    private readonly validator: Validator;

    constructor(validator: Validator) {
        this.validator = validator;
    }

    public async handle(review: IReview) {
        this.validator.ValidateReview(review);
    }
    
}