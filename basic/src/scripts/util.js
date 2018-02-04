export default {
  /**
   * 每一行视为一个数组
   * @param  num 
   */
  createRow(num = 0) {
    return (new Array(9)).fill(num)
  },

  /**
   * 九宫视为九行，作为一个数组
   * @param  num 
   */
  createMatrix(num = 0) {
    return Array.from({length: 9}, () => this.createRow(num))
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
  }

  
}