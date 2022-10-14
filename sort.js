function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    // 从第一个元素开始，比较相邻的两个元素，前者大就交换位置
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let num = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = num
      }
    }
    // 每次遍历结束，都能找到一个最大值，放在数组最后
  }
  return arr
}

//测试
console.log(bubbleSort([2, 3, 1, 5, 4])) // [1, 2, 3, 4, 5]

function selectSort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    // 假设每次循环，最小值就是第一个
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      // 如果最小值大于其他的值，则修改索引，从而找到真正的最小值
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    // 最小值和第一个交换位置
    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

// test
const arr2 = [3, 1, 2, 5, 4]
console.log(bubbleSort(arr2)) // [1, 2, 3, 4, 5]

function quickSort(arr) {
  if (arr.length <= 1) return arr
  // 每次取第一个元素作为基准值
  const pivot = arr.shift()
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      // 如果小于基准值，则把它放在左数组
      left.push(arr[i])
    } else {
      // 如果大于等于基准值，则放在右数组
      right.push(arr[i])
    }
  }
  // 递归处理，并把左中右三个数组拼接起来
  return quickSort(left).concat([pivot], quickSort(right))
}

// test
const arr3 = [3, 1, 2, 5, 4]
console.log(quickSort(arr3)) // [1, 2, 3, 4, 5]
