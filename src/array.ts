type Arr = any[];
// 打乱数组
export const shuffle = (arr: Arr) => {
  return arr.sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  });
};
//去重
export const deduplication = (arr: Arr) => {
  return [...new Set(arr)];
};
// 计算数组成员数量
export const countElement = (arr: Arr) => {
  arr.reduce((obj, element) => {
    obj[element] = obj[element] ? ++obj[element] : 1;
    return;
  }, {});
};
