function printPrime(start, end) {
  let isPrime = new Array(end).fill(true)

  for (let i = 2; i < end; i++) {
    if (isPrime[i]) {
      for (let j = 2 * i; j < end; j += i) {
        isPrime[j] = false
      }
    }
  }

  for (let i = start; i <= end; i++) {
    if (isPrime[i]) console.log(i)
  }
}

// 打印100-1000的素数
printPrime(100, 1000)
