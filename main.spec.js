describe('main.js', () => {
  beforeAll(() => {
    element = document.createElement('div');
    element.setAttribute('id', 'result');
    document.body.appendChild(element);
    this.element = element;
  });
  afterAll(() => {
    document.body.removeChild(this.element);
  })
  describe('calculate()', () => {

    it('should validate the expression if first number is invalid', () => {
      spyOn(window, 'setResult').and.stub(); // this is how we create spy methods.
      calculate('a+3');
      expect(window.setResult).toHaveBeenCalled() // here we identify if our spy method called or not.
      expect(window.setResult).toHaveBeenCalledWith('Expression not recognized!'); // this checks if methods is called with that args.
      expect(window.setResult).toHaveBeenCalledTimes(1); // checks how many times spy method get called.
    });

    it('should validate the expression if second number is invalid', () => {
      spyOn(window, 'setResult');// .and.stub(); is default and can be omitted.
      calculate('2+b');
      expect(window.setResult).toHaveBeenCalled();
      expect(window.setResult).toHaveBeenCalledWith('Expression not recognized!');
      expect(window.setResult).toHaveBeenCalledTimes(1);
    });

    it('should validate the expression if operation is invalid', () => {
      spyOn(window, 'setResult');
      calculate('3_3');
      expect(window.setResult).toHaveBeenCalled();
      expect(window.setResult).toHaveBeenCalledWith('Expression not recognized!');
      expect(window.setResult).toHaveBeenCalledTimes(1);
    });

    it('should call the Add()', () => {
      const spy = spyOn(Calculator.prototype, 'add');
      calculate('2+6');
      expect(Calculator.prototype.add).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(2); // we can also call this way.
      expect(Calculator.prototype.add).toHaveBeenCalledWith(6);
    });
    it('should call the Subtract()', () => {
      const spy = spyOn(Calculator.prototype, 'subtract');
      calculate('2-6');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(6);
      expect(spy).not.toHaveBeenCalledWith(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should call the Multiply()', () => {
      const spy = spyOn(Calculator.prototype, 'multiply');
      calculate('2*6');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(6);
      expect(spy).not.toHaveBeenCalledWith(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should call the Divide()', () => {
      const spy = spyOn(Calculator.prototype, 'divide');
      calculate('2/6');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(6);
      expect(spy).not.toHaveBeenCalledWith(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call setResult() (example for callThrough)', () => {
      const spy = spyOn(window, 'setResult');
      /**
       * when we spy on method jasmine not executes it,
       * so to do that we can add `.and.callThrough()`
       */
      const multiplySpy = spyOn(Calculator.prototype, 'multiply').and.callThrough();
      calculate('3 * 5');
      expect(spy).toHaveBeenCalled();
      expect(multiplySpy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(15);
    });




    xit('should call setResult() (example for returnValue)', () => {
      spyOn(window, 'setResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue('return value');
      calculate('3*5');
      expect(window.setResult).toHaveBeenCalled();
      expect(Calculator.prototype.multiply).toHaveBeenCalled();
      expect(window.setResult).toHaveBeenCalledWith(15);
    });

    xit('should call setResult() (example for returnValues)', () => {
      const spy = spyOn(window, 'setResult');
      /**
       * when we spy on method jasmine not executes it,
       * so to do that we can add `.and.callThrough()`
       */
      const multiplySpy = spyOn(Calculator.prototype, 'add').and.returnValues(44, 'return');
      calculate('3 + 5');
      expect(spy).toHaveBeenCalled();
      expect(multiplySpy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(15);
    });

    xit('should call setResult() (example for callFake)', () => {
      const spy = spyOn(window, 'setResult');
      /**
       * when we spy on method jasmine not executes it,
       * so to do that we can add `.and.callThrough()`
       */
      const multiplySpy = spyOn(Calculator.prototype, 'multiply').and.callFake(() => {
        return 'call fake';
      });
      calculate('3 * 5');
      expect(spy).toHaveBeenCalled();
      expect(multiplySpy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(15);
    });

    it('doesn\'t handle a error', () => {
      spyOn(Calculator.prototype, 'multiply').and.throwError('multiply throwing error');
      expect(() => {
        calculate('3*3')
      }).toThrowError('multiply throwing error');
    })


  });

  describe('setResult()', () => {
    let element;
    it('should update the result to the dom element', () => {

      setResult('5');
      expect(this.element.innerText).toBe('5');
    });
  });

  describe('showVersion()', () => {
    it('should call the showVersion method (example for getter)', (done) => {
      const element = spyOn(document, 'getElementById').and.returnValue({ innerText: null });
      const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve('0.1')); // to spy on getter property.
      showVersion();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      spy().then((version) => {
        expect(element().innerText).toBe(version);
        done();
      })
    });
  });
});
