import Util from '../core/util'
import SudokuGenerator from '../core/generator'

export default class Grid {
  constructor(container) {
    this.$container = container
  }

  build() {
    const sudoku = new SudokuGenerator()
    sudoku.generate()
    // const matrix = Util.matrix.createRandomMatrix()
    const matrix = sudoku.matrix
    const rowGroupClasses = ['row-group-top', 'row-group-middle', 'row-group-bottom']
    const colGroupClasses = ['col-group-left', 'col-group-center', 'col-group-right']
    
    const $cells = matrix.map(rowArrays => rowArrays.map((cellVal, i) => {
      return $('<span>').addClass(colGroupClasses[i % 3]).text(cellVal)
    }))

    const $divArr = $cells.map(($spanArr, i) => {
      return $('<div class="row">').addClass(rowGroupClasses[i % 3]).append($spanArr)
    })

    this.$container.append($divArr)
  }

  layout() {
    const width = $('span:first', this.$container).width()
    $('span', this.$container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width > 32 ? `${width / 2}px` : ''
      })
  }
}