/*
如下代码所示，使用 find 函数实现链式调用



// 查找data中，符合where中条件的数据，并根据orderBy中的条件进行排序
const result = find(data).where({
  "title": /\d$/   // 这里意思是过滤出数组中，满足title字段中符合 /\d$/的项
}).orderBy('userId', 'desc');  // 这里的意思是对数组中的项按照userId进行倒序排列

//=> 返回 [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
console.log(result.value);
*/

function find(data) {
  class FindManager {
    constructor(data) {
      this.data = data;
    }
    where(query) {
      const data = [...this.data];
      return new FindManager(data.filter((item) => {
        return Object.entries(query).every(([key, filter]) => {
          if (Object.prototype.toString.call(filter).slice(8, -1) === 'Regex') {
            return filter.test(item[key]);
          } else {
            return filter === item[key];
          }
        });
      }));
    }
    orderBy(key, order) {
      const data = [...this.data];
      data.sort((a, b) => {
        return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
      });
      return new FindManager(data);
    }
    get value() {
      return this.data;
    }
  }
  return new FindManager(data);
}

const data = [
  {userId: 8, title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];

const result = find(data).where({
  "title": /\d$/
}).orderBy('userId', 'desc');

console.log(result.value);