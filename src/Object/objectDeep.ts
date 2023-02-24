/**
 * 计算对象的层数
 * @param obj 任意对象
 */
export const getObjectLevel = (obj: Record<string, string>) => {
  // 先判断第obj是否对象，是则默认层数1并且遍历递归比较每一个属性最深，类似二叉树深度
  let res = 0
  if (typeof obj !== 'object' || !obj) return

  const computed = (obj: Record<string, string>, level = 1) => {
    Object.values(obj).forEach((value) => {
      if (typeof value === 'object' && value !== null) {
        computed(value, level + 1)
      }
    })
    res = Math.max(res, level)
  }
  computed(obj)

  return res
}
