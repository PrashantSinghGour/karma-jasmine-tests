function calculate(value) {
  const inputValue = value;
  const expression = /\+|\-|\*|\//;
  const numberA = Number(inputValue.split(expression)[0]);
  const numberB = Number(inputValue.split(expression)[1]);
  const operation = inputValue.match(expression);
  if (isNaN(numberA) || isNaN(numberB) || !operation) {
    setResult('Expression not recognized!')
    return;
  }
  const operator = operation[0];

  const calculator = new Calculator();
  calculator.add(numberA)
  switch (operator) {
    case '+':
      calculator.add(numberB);
      break;
    case '-':
      calculator.subtract(numberB);
      break;
    case '*':
      calculator.multiply(numberB);
      break;
    case '/':
      calculator.divide(numberB)
      break;
  }
  setResult(calculator.total);
}

document?.getElementById('inputValue')?.addEventListener('change', (event) => {
  calculate(event.target.value);
});

function showVersion() {
  const element = document.getElementById('version');
  if (element) {
    const calculator = new Calculator();
    calculator.version.then((result) => {
      element.innerText = result;
    });
  }

}


function setResult(data) {
  document.getElementById('result').innerHTML = data;
}

// async function api() {
//   const data = await fetch('https://gist.githubusercontent.com/PrashantSinghGour/5fef7d0320a2c5910d77de26de856f93/raw/6c8a3492a3429072ab343bf463d1a06652e5ab1a/testApiVersion.json')
//     .then(res => { return res.json() })
//     .then(json => { return json.version });
//   console.log({ data })
// }
// api();
