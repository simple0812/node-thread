const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

console.log(`thread ${workerData.index}`, workerData.data);

function workflow(arr, fn) {
  return new Promise(function (resolve, reject) {
    next();

    function next() {
      if (!arr || arr.length <= 0) {
        resolve();
        return;
      }

      let data = arr.shift();

      setImmediate(function () {
        fn(data, next);
      }, 0);
    }
  });
}

let startTime = 0;
async function run() {
  let sum = 0
  startTime = Date.now();
  await workflow(workerData.data, (item, next) => {
    setTimeout(() => {
      // console.log(`thread index: ${workerData.index} -> ${item}`);
      sum += item
      next();
    }, 100);
  });
  let xNow = Date.now();

  parentPort.postMessage({
    index: workerData.index,
    sum,
    time: (xNow - startTime) / 1000
  });
}

run();
