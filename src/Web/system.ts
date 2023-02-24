/**
 * 判断是否为mac系统
 * @returns boolean
 */
export function isMac() {
  return navigator.userAgent.toLowerCase().includes('mac')
}
/**
 * 判断是否为win系统
 * @returns boolean
 */
export function isWin() {
  return navigator.userAgent.toLowerCase().includes('windows')
}