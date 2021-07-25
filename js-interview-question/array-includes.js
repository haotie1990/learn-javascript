
Array.prototype.Includes(valueToFind, fromIndex) {
  if (this == null) {
    return false;
  }
  const array = this;
  const length = array.length;

  if (length === 0) {
    return false;
  }

  // 默认从数组第一个元素开始查找
  fromIndex = fromIndex | 0;
  fromIndex = Math.max(fromIndex >= 0 ? fromIndex : length - Math.abs(fromIndex), 0);
  
  const sameValueZero = function(x, y) {
    return x === y || (typeof x === 'number' && typeof y === 'number' && Number.isNaN(x) && Number.isNaN(y));
  }

  let index = fromIndex;
  while (index < length) {
    if (index in array) {
      if (sameValueZero(array[index], valueToFind)) {
        return true;
      }
    }
    index++;
  }
  return false;
}