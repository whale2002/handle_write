function compose(...fns) {
  if (fns.length === 0) return (value) => value;

  if (fns.length === 1) return fns[0];

  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

function compose(...middlewares) {
  return function (ctx) {
    let index = -1;

    function dispatch(i) {
      index = i;
      const fn = middlewares[i];
      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}

async function middleware1(ctx, next) {
  console.log("Middleware 1 before");
  await next();
  console.log("Middleware 1 after");
}

async function middleware2(ctx, next) {
  console.log("Middleware 2 before");
  await next();
  console.log("Middleware 2 after");
}

async function middleware3(ctx, next) {
  console.log("Middleware 3 before");
  await next();
  console.log("Middleware 3 after");
}

const fn = compose(middleware1, middleware2, middleware3);

fn({}).catch((err) => console.error(err));
