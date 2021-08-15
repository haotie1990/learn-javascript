
function filterArray(array, arrIndex) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const res = arrIndex.find(v => {
      return [].concat(v).includes(i);
    });
    if (typeof res === 'undefined' || typeof res === 'number') {
      result.push(array[i]);
    } else {
      let child = array
        .filter((v, _i) => res.includes(_i))
        .map(v => v.child ? v.child : v);
      let age = child.map(v => v.age).reduce((acc, v) => acc += v) / child.length;
      result.push({ age, child });
    }
  }
  return result;
}

const arr1 = [{age: 10},{ age: 16},{ age: 12},{ age: 22},{ age: 33},{ age: 44}];
const arr2 = [{age: 10},{ age: 16},{ age: 10},{ age: 22},{ age: 33},{ age: 40},{ age: 44},{ age: 44}];
const arr3 = [{age: 10},{ age: 20, child: [{age:10},{age:30}]},{ age: 10},{ age: 22},{ age: 33}];

console.log('%o', filterArray(arr1, [[1,2],5]));
// console.log('%o', filterArray(arr2, [[2,3],5,[6,7]]));
// console.log('%o', filterArray(arr3, [[0,1,2],4]));
