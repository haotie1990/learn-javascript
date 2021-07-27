
/**
 * 找出交集元素
 * @returns 
 */
function intersection() {
  const arrays = [].slice.call(arguments, 0);
  const result = arrays.reduce(function(acc, arr){
    return acc.filter((v) => arr.indexOf(v) !== -1);
  });
  // 去重
  return result.reduce((acc, c) => {
    if (acc.indexOf(c) === -1) {
      acc.push(c);
    }
    return acc;
  }, []);
}

//=> [2]
console.log(intersection([2, 1], [2, 3]));

//=> [1, 2]
console.log(intersection([1, 2, 2], [1, 2, 2]));

//=> [1, 2]
console.log(intersection([1, 2, 2], [1, 2, 2], [1, 2]));