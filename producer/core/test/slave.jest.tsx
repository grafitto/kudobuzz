import { Slave } from "../slave";
import { Validator } from "../validator";
import { IMessage } from "../../types";

describe('Slave', async () => {
    const slave: Slave = new Slave('', '', new Validator);
    slave.send = jest.fn();

    it('Should be called with message', async () => {
        const message: IMessage = {
            businessId: 'business',
            message: 'Message',
            rating: 3,
            sources: 'amazon',
            type: 'product'
        }

        slave.send(message);
        expect(slave.send).toHaveBeenCalledWith(message);
    });
});