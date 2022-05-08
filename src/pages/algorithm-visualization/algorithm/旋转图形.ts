export function * rotate(matrix: number[][]) {
  const l = matrix.length
  // 斜线对折
  for (let i = 0; i < l; i++) {
    for (let j = i; j < l; j++) {
      yield
      const temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
  // 水平翻转
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l / 2; j++) {
      yield
      const temp = matrix[i][j]
      matrix[i][j] = matrix[i][l - j - 1]
      matrix[i][l - j - 1] = temp
    }
  }
}

export const rotateEval = `return ${rotate.toString()}`
