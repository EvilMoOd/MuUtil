// 数字格式化
export const formatNumber = (s: number) => {
  // 无小数
  if (!s.toString().includes('.'))
    return s.toString().replace(/(?!^)(?=(\d{3})+$)/g, ',');
  // 有小数
  const arr = s.toString().split('.');
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
// 生成范围随机数
export const randomRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
