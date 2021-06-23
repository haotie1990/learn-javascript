'use strict'

/**
 * 考虑到数组、布尔型、数字类型
 * @param {string} query 
 * @returns 
 */
function qs(query) {
  if (query.startsWith('?')) {
    query = query.slice(1);
  }
  const result = {};
  query.split('&').forEach(q => {
    let [key, value] = q.split('=');
    value = typeof value === 'undefined' ? value : decodeURIComponent(value);
    if (result.hasOwnProperty(key)) {
      result[key] = [].concat(result[key], value); // 处理数组
    } else {
      result[key] = /^\d+$/.test(value) ?
        Number(value) : /^true|false$/i.test(value) ?
        value.toLowerCase() === 'true' : typeof value === 'undefined' ?
        true : value;
    }
  });
  return result;
}

console.log(qs('?name=jack&age=18&sex=&city=%E5%8C%97%E4%BA%AC&country&male=true&female=false'));
console.log(qs('name=jack&age=18&sex=&city=%E5%8C%97%E4%BA%AC&children=1&children=2&children=3'));