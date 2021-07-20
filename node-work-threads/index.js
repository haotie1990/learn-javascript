const {
  isMainThread,
  parentPort,
  workerData,
  threadId,
  MessageChannel,
  MessagePort,
  Worker
} = require('worker_threads');

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function mainThread() {
  for(let i = 0; i < 5; i++) {
    const worker = new Worker(__filename, { workerData: i });
    worker.on('exit', code => {
      console.log('worker stop with code:%s', code);
    });
    worker.on('message', message => {
      console.log('main thread receive message: %s', ab2str(message));
      worker.postMessage('hello world ' + worker.threadId);
    });
  }
}

function workerThread() {
  console.log('this is worker thread %s', threadId);
  console.log('workerData:%s', workerData);
  parentPort.on('message', message => {
    console.log('wokerThread:%s, receive message: %s', threadId, message);
  });
  parentPort.postMessage(str2ab('hello world main thread'));
}

if (isMainThread) {
  mainThread();
} else {
  workerThread();
}
