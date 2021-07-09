/**
 * versions 是一个项目的版本号列表，因多人维护，不规则，动手实现一个版本号处理函数
 * var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
 * 要求从小到大排序，注意'1.45'比'1.5'大
 * => ['1.5','1.45.0','3.3.3.3.3.3','6']
 */

function compareVersion(version1, version2) {
  const len = version1.length > version2.length ? version1.length : version2.length;
    for (let i = 0; i < len; i++) {
      const x = version1[i] || 0;
      const y = version2[i] || 0;
      if (x < y) {
        return -1;
      } else if (x > y) {
        return 1;
      }
    }
    return 0;
}

function quickSort(array, left, right) {
  left = typeof left === 'undefined' ? 0 : left;
  right = typeof right === 'undefined' ? array.length -1 : right;

  if (left < right) {
    let pivot = left;
    let index = pivot + 1;
    for (let i = index; i <= right; i++) {
      if (compareVersion(array[i], array[pivot]) === -1) {
        [array[index], array[i]] = [array[i], array[index]];
        index++;
      }
    }
    [array[pivot], array[index - 1]] = [array[index - 1], array[pivot]];
    pivot = index - 1;
    quickSort(array, left, pivot - 1);
    quickSort(array, pivot + 1, right);
  }
  return array;
}

function sortVersions(versions, left, right) {
  const _versions = versions.map(version => {
    return version.split('.').filter(_ => _ !== '').map(v => parseInt(v));
  });

  quickSort(_versions);

  return _versions.map(version => {
    return version.join('.');
  });
}

console.log(sortVersions(["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"]));