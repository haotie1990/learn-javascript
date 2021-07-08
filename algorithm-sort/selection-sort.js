
function SelectionSort(array) {
  const len = array.length;
  for(let i = 0; i < len; i++) {
    let min = i;
    for(let j = i + 1; j < len; j++) {
      if (array[min] > array[j]) {
        min = j;
      }
    }
    [array[i], array[min]] = [array[min], array[i]];
  }
  return array;
}

module.exports = SelectionSort;