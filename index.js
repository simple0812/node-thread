const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

var _ = require("lodash");

var arr = _.range(1, 19);

let threadCount = 4;
let step = Math.ceil(arr.length / threadCount);

console.log("step", step);

for (let i = 0; i < threadCount; i++) {
  const worker = new Worker("./thread.js", {
    workerData: {
      data:
        i == threadCount - 1
          ? arr.slice(i * step)
          : arr.slice(i * step, i * step + step),
      index: i,
    },
  });

  worker.once("message", (result) => {
    console.log(`thread ${result.index} end ${result.sum}  ${result.time}s`);
  });
}
