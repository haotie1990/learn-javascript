function split(str, seperator) {

  let result = [];
  while (true) {
    let index = str.indexOf(seperator);
    if (index !== -1) {
      result.push(str.slice(0, index));
      str = str.slice(index + seperator.length);
    } else {
      result.push(str);
      break;
    }
  }
  return result;
}

function split1(str, seperator) {
  let result = [];
  let fromIndex = 0;
  while(true) {
    let index = str.indexOf(seperator, fromIndex);
    if (index !== -1) {
      result.push(str.slice(fromIndex, index));
      fromIndex = index + seperator.length;
    } else {
      result.push(str.slice(fromIndex));
      break;
    }
  }
  return result;
}

console.log(split('sasa bsb cc s s', 's'));
console.log(split1('sasa bsb cc s s', 's'));
console.log('sasa bsb cc s s'.split('s'));