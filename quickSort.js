const arr = [2, 5, 3, 1, 7, 9, 6];

function quickSort(start, end, arr) {
  if (start > end) return;

  const base = arr[start];
  let i = start,
    j = end;

  while (i !== j) {
    while (arr[j] >= base && i < j) {
      j--;
    }

    while (arr[i] <= base && i < j) {
      i++;
    }

    const tmp = arr[i];
    arr[i] = arr[j]; 
    arr[j] = tmp;
  }

  // 相遇
  arr[start] = arr[i];
  arr[i] = base;

  quickSort(start, i - 1, arr);
  quickSort(i + 1, end, arr);
}

quickSort(0, arr.length - 1, arr);

console.log(arr);
