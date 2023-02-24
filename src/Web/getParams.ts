/**
 * 解析url中的params
 * @param url url
 * @returns 解析后参数
 */
export const getParam = (url: string) => {
  const r = new RegExp('(\\?|#|&)' + url + '=([^&#]*)(&|#|$)');
  const m = location.href.match(r);
  return decodeURI(!m ? '' : m[2]);
};
