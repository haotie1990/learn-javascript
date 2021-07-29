const fork = require('child_process').fork;
const path = require('path');

const child = fork('./node-process/children.js');
/**
 * fork是spawn的一个特殊情况，其返回一个childProcess
 * 并且在fork一个子进程时，会创建一个IPC通道，允许父进程与子进程之间进行通信
 * * 在子进程中，我们可以通过process.on('message')和process.send()事件和方法与父进程通信
 * * 在父进程中，我们可以通过childProcess.on('message')和childProcess.send()事件和方法与子进程通信
 */
child.on('message', data => {
  console.log('parent receive message:%s from child process', data);
  process.exit(0);
});

child.send({ message: 'hello child, this is parent process' });
