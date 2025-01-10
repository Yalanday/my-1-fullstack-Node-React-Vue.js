import {Validation} from "../src/business/business-helpers/validation";


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
