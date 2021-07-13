/**
 * 手写实现 sleep 函数
 */

function sleep(wait) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, wait);
  });
}

async function main() {
  const start = Date.now();
  console.log('start: %s', start);
  await sleep(1000);
  const end = Date.now();
  console.log('end: %s, diff: %s', end, end - start);
}

main();