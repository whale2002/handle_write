function quickSort(arr) {
  if (arr.length <= 1) return arr
  const middleIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(middleIndex, 1)[0]
  const left = []
  const right = []

  arr.forEach((item) => {
    if (item < pivot) {
      left.push(item)
    } else {
      right.push(item)
    }
  })
  return [...quickSort(left), pivot, ...quickSort(right)]
}

const res = quickSort([4, 2, 3, 1, 5, 8, 6])
console.log(res)
