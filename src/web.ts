export const getParam = (key: string) => {
  const r = new RegExp('(\\?|#|&)' + key + '=([^&#]*)(&|#|$)');
  const m = location.href.match(r);
  return decodeURI(!m ? '' : m[2]);
};
export const getCookie = (name: string) => {
  const RE = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const arr = document.cookie.match(RE);
  if (arr) {
    return decodeURI(arr[2]);
  }
  return '';
};
