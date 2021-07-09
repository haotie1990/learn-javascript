
/**
 * 快速排序
 *    基本思想：通过一趟排序将待排序数组分成独立两部分，其中一部分元素均比另一部分元素小，
 *            则可分别对这两部分继续进行排序，以达到整个数组有序
 *    算法描述：
 *      1. 从数组中挑选一个元素，成为基准“pivot”
 *      2. 所有元素比基准元素晓的放在基准元素左边，所有元素比基准元素大的放在基准元素右边，在这个分区完成后，基准处于中间位置
 *      3. 递归把小于基准元素的子序列和大于基准元素的子序列进行排序
 * @param {*} array [9, 44, 38, 5, 47, 15, 36, 2, 4, 19]
 */
function QuickSort(array, left, right) {
  const length = array.length;
  left = typeof left === 'undefined' ? 0 : left;
  right = typeof right === 'undefined' ? length - 1 : right;
  if (left < right) {
    let pivot = left;
    let index = pivot + 1;
    for (let i = index; i <= right; i++) {
      // 遇到小于基准值的元素，移动使其聚拢在一起
      if (array[i] < array[pivot]) {
        [array[index], array[i]] = [array[i], array[index]];
        index++;
      }
    }
    // 将所有小于基准值的元素全部移动到基准值左边
    [array[pivot], array[index - 1]] = [array[index - 1], array[pivot]];
    // 更新基准值
    pivot = index - 1;
    QuickSort(array, left, pivot - 1);
    QuickSort(array, pivot + 1, right);
  }
  return array;
}

console.log(QuickSort([9, 44, 38, 5, 47, 15, 36, 2, 4, 19]));