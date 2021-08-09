
/**
 * 请实现一个任务并发控制
 * class TaskManager {
 *   constructor(limit){}
 *   addTask(task) {}
 * }
 * const taskManager = new TaskManager(3);
 * taskManager.addTask(task1).then(data => {}).catch(err => {})
 * taskManager.addTask(task2).then(data => {}).catch(err => {})
 * taskManager.addTask(task3).then(data => {}).catch(err => {})
 * .
 * .
 * .
 * taskManager.addTask(taskn).then(data => {}).catch(err => {})
 */
class TaskManager {
  constructor(limit) {
    this.limit = limit || Math.MAX_VALUE;
    this.requests = [];
    this.curCountTasks = 0;
  }
  addTask(request) {
    this.requests.push({ request });
    return this.runTask(this.requests.length - 1);
  }
  nextTask() { 
    const {
      resolve,
      reject,
      request
    } = this.requests.shift();
    this.curCountTasks++;
    request()
      .then(data => {
        resolve(data);
      }, error => {
        reject(error);
      })
      .finally(() => {
        this.curCountTasks--;
        if (this.requests.length) {
          this.nextTask();
        }
      });
  }
  runTask(taskIndex) {
    return new Promise((resolve, reject) => {
      const request = this.requests[taskIndex];
      request.resolve = resolve;
      request.reject = reject;
      this.requests.splice(taskIndex, 1, request);
      if (this.curCountTasks < this.limit) {
        this.nextTask();
      }
    });
  }
}

const taskManager = new TaskManager(3);

taskManager.addTask(function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 100);
  });
}).then(message => console.log(message));
taskManager.addTask(function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 300);
  });
}).then(message => console.log(message));
taskManager.addTask(function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 200);
  });
}).then(message => console.log(message));
taskManager.addTask(function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(4), 400);
  });
}).then(message => console.log(message));
taskManager.addTask(function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(5), 100);
  });
}).then(message => console.log(message));