const asyncPool = async (delays, limit) => {
  const pool = new Set();
  const promises = [];

  for (let i = 0; i < delays.length; i++) {
    const time = delays[i]
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log(time);
        resolve(time);
      }, time);
    });

    promises.push(promise);
    pool.add(promise);

    const clean = () => pool.delete(promise);
    promise.then(clean, clean);

    if (pool.size >= limit) await Promise.race(pool);
  }

  return Promise.all(promises);
};

asyncPool([1000, 2000, 3000, 4000], 2).then(res => {
  console.log(res);
})
