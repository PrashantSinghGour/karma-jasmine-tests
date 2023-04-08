describe('calculator.js', () => { // suite
  describe('calculator', () => {
    let calculator;
    let calculator2;
    beforeEach(() => {
      //executes before execution of the each spec in the suite.

      calculator = new Calculator();
      calculator2 = new Calculator();
    });

    afterEach(() => {
      //executes after execution of the each spec in the suite.
    });

    it('should initialize the constructor', () => {
      expect(calculator).toBeTruthy();
      expect(calculator2).toBeTruthy();
      expect(calculator).toEqual(calculator2);
    });

    it('should have unique calculator object', () => {
      expect(calculator).not.toBe(calculator2);
    })

    describe('add()', () => {
      it('should add 2 numbers', () => { //test
        calculator.add(3);
        expect(calculator.total).toBe(3); // toBe is a matcher.
      });
    });

    describe('subtract()', () => {
      it('should subtract 2 numbers', () => {
        calculator.subtract(3);
        expect(calculator.total).toBe(-3);
      });
    });
    describe('multiply()', () => {
      it('should multiply 2 numbers', () => {
        calculator.add(3);
        calculator.multiply(2)
        expect(calculator.total).toBe(6);
      });
    });
    describe('divide()', () => {
      it('should divide 2 numbers', () => {
        calculator.add(3);
        calculator.divide(3)
        expect(calculator.total).toBe(1);
      });
      //toThrow matcher
      it('should not accept a number as 0 for divide', () => {
        expect(() => {
          calculator.divide(0)
        }).toThrow();

        expect(() => {
          calculator.divide(0)
        }).toThrow(new Error('number cannot be 0'));
      })
    });

    describe('get version', () => {
      it('should get version from external source', (done) => { // for async need to handle this way
        spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response('{"version": "0.4"}')));
        calculator.version.then((version) => {
          expect(version).toBe('0.4');
          done(); // call it here after task is done.
        })
      });
    })


    //asymmetric anything matcher
    it('should return a total as value', () => {
      calculator.total = 10;
      expect(calculator.total).toEqual(jasmine.anything());
    });

    //asymmetric any matcher
    it('should be an instance', () => {
      jasmine.addMatchers(CustomMatcher);
      calculator.total = 10;
      expect(calculator).toEqual(jasmine.any(Object));
      expect(calculator.total).toEqual(jasmine.any(Number))
      expect(calculator).toBeCalculator(); //custom matcher
    });

    //asymmetric objectContaining & stringContaining matcher
    it('should contain total as key', () => {
      calculator.total = 10;
      expect(calculator).toEqual(jasmine.objectContaining({ total: 10 }));
      expect(typeof calculator.total).toEqual(jasmine.stringContaining('mbe')); // searching number
    });
  });

});
