
/**
 * 冒泡排序
 * 算法描述：
 *    1. 比较相邻的两个元素，如果第一个比第二个大，则交换它们的位置
 *    2. 每一对相邻的元素做相同的动作，从开始第一对到结尾最后一对
 *    3. 针对所有的元素重复上述步骤，除了最后一个
 *    4. 重复1~3步，直到排序完成
 * @param {array} array 
 */
function BubbleSort(array) {
  const len = array.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

module.exports = BubbleSort;