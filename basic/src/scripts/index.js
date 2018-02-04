import util from './util'

const l = console.log.bind(console)

l(util.createMatrix(0))

let arr = Array.from({length: 9}, (v, i) => i + 1)
l(arr)
l(util.shuffle(arr))