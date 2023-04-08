function Calculator() {
  this.total = 0;
}

Calculator.prototype.add = function (number) {
  return this.total = this.total + number;
}

Calculator.prototype.subtract = function (number) {
  return this.total = this.total - number;
}

Calculator.prototype.multiply = function (number) {
  return this.total = this.total * number;
}

Calculator.prototype.divide = function (number) {
  if (!number) {
    throw new Error('number cannot be 0')
  }
  return this.total = this.total / number;
}

Object.defineProperty(Calculator.prototype, 'version', {
  get: () => {
    return fetch(
      'https://gist.githubusercontent.com/leelanarasimha/4b3dde448c828ec54f29fcc727c680df/raw/096bb0f055877c5f8e7243518be7be03772d2c4a/version.json'
    )
      .then(function (result) {
        return result.json();
      })
      .then(function (jsonData) {
        return jsonData.version;
      });
  },
  configurable: true,
  enumerable: true
});
