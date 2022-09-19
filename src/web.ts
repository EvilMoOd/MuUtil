export const getParam = (key: string) => {
  const r = new RegExp('(\\?|#|&)' + key + '=([^&#]*)(&|#|$)');
  const m = location.href.match(r);
  return decodeURI(!m ? '' : m[2]);
};
