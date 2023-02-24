// 计算数组成员数量
export const countElement = (arr: Array<any>) => {
  arr.reduce((obj, element) => {
    obj[element] = obj[element] ? ++obj[element] : 1;
    return;
  }, {});
};
