import Util from './util'

export default class SudokuGenerator {
  generate() {
    while (!this.internalGenerate()) {
      console.log('Generate Failed. Try again.')
    }
  }

  internalGenerate() {
    this.matrix = Util.matrix.createMatrix()
    this.randomMatrix = Util.matrix.createRandomMatrix()

    // 填写数字1-9
    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false
      }
    }
    return true
  }

  fillNumber(n) {
    return this.fillRow(n, 0)
  }

  fillRow(n, rowIndex) {
    // 9行全部填完
    if (rowIndex > 8) {
      return true
    }

    // 当前行
    const row = this.matrix[rowIndex]
    // 当前行随机排列0-8
    const randomArray = this.randomMatrix[rowIndex]
    for (let i = 0; i < 9; i++) {
      // 随机选一列
      const colIndex = randomArray[i]
      // 当前列已经有值
      if (row[colIndex]) {
        continue
      }
      // 检查是否可以填n
      if (!Util.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue
      }
      // 填写当前行的n，并递归调用填写下一行的n，如果下一行填写失败则退回重新填写上一行的下一个位置
      row[colIndex] = n
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0
        continue
      }

      return true
    }

    return false
  }
}

// const sudoku = new SudokuGenerator()
// sudoku.generate()
// console.log(sudoku.matrix)