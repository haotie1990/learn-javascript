
process.on('message', data => {
  console.log('child receive message:%s from parent process', data);
  process.exit(0);
});

process.send({ message: 'hello child, this is child process' });