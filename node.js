// node 事件循环

console.log("start");

setImmediate(() => {
  console.log("setImmediate");
});

setTimeout(() => {
  console.log("setTimeout");
});

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve(123).then((res) => {
  console.log(res);
});

console.log("end");
