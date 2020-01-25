const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a negative number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return 0 number is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return greeting message', () => {
        const result = lib.greet('Guilherme');
        expect(result).toMatch(/Guilherme/);
        expect(result).toContain("Guilherme");
    }); 
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']))
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        //expect(result).toEqual({ id: 1, price: 10, category: "teste" });
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id', 1);
    })
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a); }).toThrow()
        });

    });
    
    it('should return a user object', () => {
        const result = lib.registerUser('Guilherme');
        expect(result).toMatchObject({ username: 'Guilherme' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer das more than 10 points', () => {
        db.getCustomerSync = function (customerId) {
            console.log('Fake reading customer ...')
            return { id: customerId, points: 20 }
        }

        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)
    });
});

describe('notifyCustomer', () => {
    it('should send an email to then customer', () => {
        db.getCustomerSync = function (customerId) {
            return { email: 'a' }
        }

        let mailSend = false;
        mail.send = function (email, message) {
            mailSend = true
        }

        lib.notifyCustomer({ customerId: 1 });
        expect(mailSend).toBe(true);
    });
});