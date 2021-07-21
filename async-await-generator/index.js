const thunkify = fn => (...rest) => callback => fn(...rest, callback)

const thunkifyFn = (fn) => {
  return (...rest) => {
    return (callback) => {
      return fn(...rest, callback);
    }
  }
}

const mockReadFile = (file, decode, callback) => {
  setTimeout(() => {
    callback(null, {
      file,
      decode
    })
  }, 100);
}

const thunk = thunkifyFn(mockReadFile);

const thunkFnPromise = (fn) => {
  return (...rest) => {
    return new Promise((resolve, reject) => {
      fn(...rest, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

const thunkPromise = thunkFnPromise(mockReadFile);

function* readFileThunkWithGen() {
  try {
    const content1 = yield thunk('/etc/passwd', 'utf8');
    const content2 = yield thunk('/etc/profile', 'utf8');
    return {
      content1,
      content2
    };
  } catch (err) {
    return err;
  }
}

function* readFileThunkWithPromise() {
  try {
    const content1 = yield thunkPromise('/etc/passwd', 'utf8');
    const content2 = yield thunkPromise('/etc/profile', 'utf8');
    return {
      content1,
      content2
    };
  } catch (err) {
    return err;
  }
}

const run = generator => {
  let done = () => {};
  const g = generator();
  const next = (err, ...rest) => {
    if (err) {
      return done(g.throw(err).value);
    }
    const result = g.next(rest.length > 1 ? rest : rest[0])
    if (result.done) {
      return done(null, result.value);
    }
    result.value(next);
  }
  next();
  return (callback) => {
    done = callback;
  }
}
const result = run(readFileThunkWithGen);
result((err, data) => {
    console.log(err, data);
});

const runPromise = generator => {
  return new Promise((resolve, reject) => {
    const g = generator();
    const next = res => {
      const result = g.next(res);
      if (result.done) {
        return resolve(result.value);
      }
      result.value
        .then(
          next,
          err => reject(gen.throw(err).value)
        );
    }
    next();
  });
}

// runPromise(readFileThunkWithPromise)
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error(error);
//     });

/**
 * babel转换await async语法糖为generator
 * async function main() {
 *   const one = await 1;
 *   const two = await 2;
 *   return { one, two };
 * }
 * main();
 */
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(function* () {
    const one = yield 1;
    const two = yield 2;
    return {
      one,
      two
    };
  });
  return _main.apply(this, arguments);
}

main().then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
});