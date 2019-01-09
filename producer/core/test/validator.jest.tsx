import { Validator } from "../validator";
import { IMessage } from "../../types";


describe('Producer', async () => {
    const validator = new Validator();
    describe('Validator success', async () => {
        it('No error thrown', async () => {
            const message: IMessage = {
                businessId: 'business',
                message: 'Message',
                rating: 3,
                sources: 'amazon',
                type: 'product'
            }
            try {
                validator.ValidateMessage(message);
            } catch(e) {
                expect(e).toBeNull();
            }
        });
    });
    describe('Validator Errors', async() => {
        it('Should throw an error when wrong rating is validated', async () => {
            const message: IMessage = {
                businessId: 'business',
                message: 'Message',
                rating: 12,
                sources: 'amazon',
                type: 'product'
            }
            try {
                validator.ValidateMessage(message);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('Rating must be a number');
            }
        });
        it('Should throw an error when wrong message is passed', async () => {
            const message = {
                businessId: 'business',
                message: 'Message',
                rating: 4,
                sources: 'some source',
                type: 'product'
            }

            try {
                // @ts-ignore
                validator.ValidateMessage(message);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('Sources must be a string containing \'facebook\', \'amazon\' or \'kudobuzz\'')
            }
        });
        it('Should throw an error when wrong type is passed', async() => {
            const message = {
                businessId: 'business',
                rating: 3,
                sources: 'facebook',
                type: 'some type',
                message: 'Message'
            }

            try {
                // @ts-ignore
                validator.ValidateMessage(message);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('Types should be a string containing \'product\' or \'site\'');
            }
        });
    });
});