/**
 * 精确判断所有类型
 * @param data 数据
 * @param type 类型，用于判断是否指定类型
 * @returns 是或否
 */
export function DataType(data: any, type?: string) {
  const dataType = Object.prototype.toString
    .call(data)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase();
  return type ? dataType === type : dataType;
}
