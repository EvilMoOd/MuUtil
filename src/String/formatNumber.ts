/**
 * 数字格式化
 * @param num 数字
 * @returns 格式化后数字
 */
export const formatNumber = (num: number) => {
  // 无小数
  if (!num.toString().includes('.'))
    return num.toString().replace(/(?!^)(?=(\d{3})+$)/g, ',');
  // 有小数
  const arr = num.toString().split('.');
  // 整数部分
  arr[0] = arr[0].replace(/(?!^)(?=(\d{3})+$)/g, ',');
  // 小数部分
  const ceil = arr[1].split('');
  for (let i = 2; i < ceil.length; i += 3) {
    ceil.splice(i, 1, `${ceil[i]},`);
  }
  arr[1] = ceil.join('');
  return arr.join('.');
};
