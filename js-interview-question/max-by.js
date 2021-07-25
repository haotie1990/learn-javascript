

function maxBy(array, keyBy) {
  if (!array || !array.length) {
    return null;
  }
  const length = array.length;
  let max = array[0];
  let result = [max];
  for (let i = 1; i < length; i++) {
    const value = array[i];
    if (keyBy(max) === keyBy(value)) {
      result.push(value);
    } else if (keyBy(max) < keyBy(value)) {
      max = value;
      result = [max];
    }
  }
  if (result.length === 1) {
    return result[0];
  }
  return result;
}

console.log(maxBy([{ value: 6 }, { value: 7 }, { value: 4 }], x => x.value));

console.log(maxBy([{ value: 6 }, { value: 2 }, { value: 4 }, { value: 6 }]
  , x => x.value));