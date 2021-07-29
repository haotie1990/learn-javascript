const childProcess = require('child_process');

const spawn = childProcess.spawn;
const exec = childProcess.exec;
const execFile = childProcess.execFile;
const fork = childProcess.fork;

// exec执行会产生一个子shell，并且可以处理所有的shell命令，一般情况下我们在需要利用shell功能的时候才会用到
exec( 'for i in $( ls -LR ); do echo item: $i; done', ( e,  stdout,  stderr)=> {
  if ( e  instanceof Error) {
      console.error( e);
      throw  e;
  }
  console.log( 'stdout ',  stdout);
  console.log( 'stderr ',  stderr);
});

// spawn创建子进程会返回一个ChildProcess对象流，对于子进程返回大量数据需要实时读取的情况更适合