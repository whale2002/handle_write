// 一维数组变二维数组，参数是数组和每个数组的长度

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3
// -> [1, 2, 3] [4, 5, 6] [7, 8, 9] [10]

function util(arr, length) {
  const res = []
  const size = Math.ceil(arr.length / length)

  for (let i = 0; i < size; i++) {
    const item = arr.slice(i * length, (i + 1) * length)
    res.push(item)
  }

  console.log(res)
}

util([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)