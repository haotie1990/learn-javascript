/**
 * 给定起止日期，返回中间的所有月份
 * 输入两个字符串 2018-08  2018-12
 * 输出他们中间的月份 [2018-9,2018-10, 2018-11]
*/

function printMonth(start, end) {
  const [startYear, startMonth] = start.split('-');
  let startTime = new Date(startYear, +startMonth - 1);
  const [endYear, endMonth] = end.split('-');
  let endTime = new Date(endYear, +endMonth - 1);
  let result = [];
  do {
    let month = startTime.getMonth();
    if (month === 11) {
      startTime.setMonth(0);
      startTime.setFullYear(startTime.getFullYear() + 1);
    } else {
      startTime.setMonth(month + 1);
    }
    if (startTime.getTime() < endTime.getTime()) {
      result.push(`${startTime.getFullYear()}-${startTime.getMonth() + 1}`);  
    }
  } while (startTime.getTime() < endTime.getTime())
  return result;
}

console.log(printMonth('2021-01', '2022-12'));