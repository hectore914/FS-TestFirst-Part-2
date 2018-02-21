function factorialIterative(num) {
  let product = 1;

  for (num; num > 1; num--) {
    product *= num;
  }

  return product;
}

function factorial(num) {
  if (num === 0) {
    return 1;
  }

  return num * factorial(num - 1);
}

function fib(num) {
  if (num === 0 || num === 1) {
    return 1;
  }

  return fib(num - 1) + fib(num - 2);
}

function type(input) {
  return Object.prototype.toString.call(input).slice(8, -1);
}

function stringify(input) {
  if (type(input) === 'String') {
    return '"' + input + '"';
  } else if (type(input) === 'Array') {
    let result = input.map((ele) => stringify(ele));
    return '[' + result.join(',') + ']';
  } else if (type(input) === 'Object') {
    let result =[];

    Object.keys(input).forEach((key) => {
      let val = stringify(input[key]);
      result.push('"' + key + '": ' + val)
    });

    return '{' + result.join(',') + '}';
  } else {
    return '' + input
  }
}
