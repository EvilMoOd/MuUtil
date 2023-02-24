/**
 * 生成随机颜色
 * @returns 颜色
 */
export const randomColor = () =>
  '#' +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0');
