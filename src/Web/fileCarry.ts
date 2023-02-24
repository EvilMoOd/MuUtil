import { isWin } from './system';

const unit = ['B', 'KB', 'MB', 'GB', 'TB'];
/**
 * 根据系统格式化文件大小
 * @param bytes 字节大小
 * @param precision 保留位数/精度
 */
export default function fileCarry(bytes: number, precision = 2) {
  const carry = isWin() ? 1024 : 1000;
  let index = 0;
  if (bytes < carry) return bytes + unit[index];
  while (bytes >= carry) {
    bytes /= carry;
    index++;
  }
  return bytes.toFixed(precision) + unit[index];
}
