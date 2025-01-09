
import {calcualate} from "../src/services/user-services";
import {Validation} from "../src/helpers/validation";

describe('app', () => {
    it('num', () => {
        expect(calcualate(5, 5)).toBe(10);
    })
})



describe('Validation: ', () => {

    it('email valid', ()=>{
        expect(Validation.email('mama@mama.ru')).toBe(true);
    })

    it('email invalid', ()=>{
        expect(Validation.email('mama@mama')).toBe(false);
    })

    it('password valid', ()=>{
        expect(Validation.password('A@4112341a')).toBe(true);
    })

    it('password invalid', ()=>{
        expect(Validation.password('1234')).toBe(false);
    })

})
