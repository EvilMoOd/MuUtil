// 打乱数组
export const shuffle = (arr: any[]) => {
  return arr.sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  });
};
//去重
export const deduplication = (arr: any[]) => {
  return [...new Set(arr)];
};
