function doubler(num) {
  return num * 2;
}

function map(arr, func) {
  let resultArr = [];

  for (let i = 0; i < arr.length; i++) {
    let mapped = func(arr[i]);
    resultArr.push(mapped);
  }

  return resultArr;
}

function filter(arr, func) {
  let resultArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      resultArr.push(arr[i]);
    }
  }

  return resultArr;
}

function contains(obj, ele) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === ele) {
        return true;
      }
    }
  }

  return false;
}

function countWords(str) {
  return str.split(' ').length;
}

function reduce(arr, initialVal, func) {
  let currentVal = initialVal;

  for (let i = 0; i < arr.length; i++) {
    currentVal = func(currentVal, arr[i]);
  }

  return currentVal;
}

function countWordsInReduce(currentVal, str) {
  return currentVal + countWords(str);
}

function sum(arr) {
  return reduce(arr, 0, function(num1, num2) {
    return num1 + num2;
  });
}

function every(arr, func) {
  let everyIterator = function(currentVal, nextVal) {
    return currentVal && func(nextVal)
  }
  return reduce(arr, true, everyIterator)
}

function any(arr, func) {
  return reduce(arr, false, function(currentVal, nextVal) {
    return currentVal || func(nextVal);
  });
}
