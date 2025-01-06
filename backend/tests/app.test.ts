
import {calcualate} from "../src/services/user-services";

describe('app', () => {
    it('num', () => {
        expect(calcualate(5, 5)).toBe(10);
    })
})
