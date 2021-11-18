/**
 * @file
 * @see https://github.com/caolan/async/issues/1729
 */

const { queue } = require('./lib');

const createTask = () => {
  return {
    doIt: () => {
      return new Promise((r) => setTimeout(r, 2000));
    }
  };
};

const createQueueAndProcess = async () => {
  await 0;
  const q = queue(async (task) => {
    await task.doIt();
    console.log("task done");
  });

  //Comment the empty array push line below
  // and see the issue go away
  q.push([]);
  q.push([createTask(), createTask(), createTask()]);

  await q.drain();
  console.log("all tasks completed");
};

createQueueAndProcess();