import util from './util'

const l = console.log.bind(console)

// l(util.createMatrix(0))

// let arr = Array.from({length: 9}, (v, i) => i + 1)
// l(arr)
// l(util.shuffle(arr))

class Grid {
  constructor(container) {
    this.$container = container
  }

  build() {
    const matrix = util.createMatrix()
    
    const $cells = matrix.map(rowArrays => rowArrays.map(cellVal => {
      return $(`<span>${cellVal}</span>`)
      // return $('<span>').text(cellVal)
    }))

    const $divArr = $cells.map($spanArr => {
      return $('<div>').append($spanArr)
    })

    this.$container.append($divArr)
  }


}

new Grid($('#container')).build()