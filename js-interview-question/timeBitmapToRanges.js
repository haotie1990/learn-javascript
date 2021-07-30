/**
 * 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，
 * 例如110000000000000000000000000000000000000000000000，
 * 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，
 * 也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
 * 时间区间被选中，例如110010000000000000000000000000000000000000000000，
 * 表示00:00-1:00和02:00-02:30这两个时间区间被选中了。
 *
 * 要求：写一个函数timeBitmapToRanges，将上述规则描述的时间位图转换成一个选中时间区间的数组。
 * 示例输入："110010000000000000000000000000000000000000000000"
 * 示例输出：["00:00~01:00", "02:00~02:30"]
 */

function timeBitmapToRanges(timeBitmap) {
  let result = [];
  let stack = [];

  const convert = function(index, isEnd) {
    let time = index + (isEnd ? 1 : 0);
    time = time * 0.5;
    return `${('0' + Math.floor(time)).slice(-2)}:${('0' + ((time % 1) * 60)).slice(-2)}`;
  }
  for (let i = 0; i < timeBitmap.length; i++) {
    let t = timeBitmap[i];
    if (t !== '0') {
      stack.push(i);
    } else if (stack.length && t === '0') {
      let startTime = convert(stack[0]);
      let endTime = convert(stack[stack.length - 1], true);
      result.push(startTime + '~' + endTime);
      stack.length = 0;
    }
  }
  return result;
}

console.log(timeBitmapToRanges('110010000000000000000000000000000000000000000000'));
console.log(timeBitmapToRanges('110010000000000000000000010000000000000100000000'));