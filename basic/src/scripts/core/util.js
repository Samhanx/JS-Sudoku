/**
 * 数组矩阵
 */
const matrixToolkit = {
  /**
   * 每一行视为一个数组
   * @param  num 
   */
  createRow(num = 0) {
    return (new Array(9)).fill(num)
  },

  /**
   * 矩阵九宫视为九行，作为一个数组
   * @param  num 
   */
  createMatrix(num = 0) {
    return Array.from({length: 9}, () => this.createRow(num))
  },

  /**
   * 生成随机数组矩阵 0-8
   */
  createRandomMatrix() {
    const matrix = this.createMatrix()
    const orderedMatrix = matrix.map(row => row.map((v, i) => i))
    const randomMatrix = orderedMatrix.map(row => this.shuffle(row))
    return randomMatrix
  },

  /**
   * Fisher Yates 乱序算法
   * @param  array 
   */
  shuffle(array) {
    const endIndex = array.length - 2
    for (let i = 0; i < endIndex; i++) {
      const j = i + Math.floor(Math.random() * (array.length - i))
      ; [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  },

  /**
   * 检查指定位置是否可以填写数字
   */
  checkFillable(matrix, n, rowIndex, colIndex) {
    // 当前行
    const row = matrix[rowIndex]
    // 当前列
    // (new Array(9)).map 返回的仍然是empty * 9
    const col = Array.from({length: 9}).map((v, i) => matrix[i][colIndex])
    // 宫序号
    const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex)
    // 当前宫
    const box = boxToolkit.getBoxCells(matrix, boxIndex)

    // 检查当前行，列，宫中都没有填写数字n
    for (let i = 0; i < 9; i++) {
      if (row[i] === n || col[i] === n || box[i] === n) {
        return false
      }
    }
    return true
  }
}

/**
 * 宫坐标系
 * 1. 行列坐标与宫坐标互转
 * 2. 取出某一宫的数据数组
 */
const boxToolkit = {
  getBoxCells(matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3
    const startColIndex = boxIndex % 3 * 3
    const result = []
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
      const colIndex = startColIndex + cellIndex % 3
      result.push(matrix[rowIndex][colIndex])
    }
    return result
  },

  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    }
  },

  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    }
  }
}

export default class Toolkit {
  static get matrix() {
    return matrixToolkit
  }

  static get box() {
    return boxToolkit
  }
}