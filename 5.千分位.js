/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  let res = "";
  let counter = 0;

  while (n >= 10) {
    res = (n % 10).toString() + res;
    n = Math.floor(n / 10);

    counter++;
    if (counter % 3 === 0) res = "." + res;
  }

  res = n.toString() + res;

  console.log(res);
};

// 12,345,678

thousandSeparator(12345678);
