import Util from './util'
import SudokuGenerator from './generator'

function checkArray(array) {
  const length = array.length
  const marks = new Array(length).fill(true)

  for (let i = 0; i < length - 1; i++) {
    if (!marks[i]) {
      continue
    }
    const v = array[i]
    // is valid 1-9
    if (!v) {
      marks[i] = false
      continue
    }
    // is repeat i + 1 - 9 and i
    for (let j = i + 1; j < length; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false
      }
    }
  }

  return marks
}

export default class Checker {
  constructor(matrix) {
    this._matrix = matrix
    this._matrixMarks = Util.matrix.createMatrix(true)
  }

  get matrix() {
    return this._matrix
  }

  get matrixMarks() {
    return this._matrixMarks
  }

  get isSuccess() {
    return this._isSuccess
  }

  check() {
    this.checkRows()
    this.checkCols()
    this.checkBoxes()
    this._isSuccess = this._matrixMarks.every(row => row.every(mark => mark))
    return this._isSuccess
  }

  checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex]
      const marks = checkArray(row)

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }

  checkCols() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      let col = []
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        col[rowIndex] = this._matrix[rowIndex][colIndex]
      }

      const marks = checkArray(col)
      for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }

  checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const box = Util.box.getBoxCells(this._matrix, boxIndex)
      const marks = checkArray(box)

      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const { rowIndex, colIndex } = Util.box.convertFromBoxIndex(boxIndex, cellIndex)
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }
}

// const sudoku = new SudokuGenerator()
// sudoku.generate()
// const matrix = sudoku.matrix
// const checker = new Checker(matrix)
// console.log('check result', checker.check())
// console.log(checker.matrix)
// console.log(checker.matrixMarks)

