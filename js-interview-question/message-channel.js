console.log(1)

const channel = new MessageChannel();
// 注册进入task队列
channel.port1.onmessage = (ev) => {
  console.log(ev.data)
}

setTimeout(() => {
  console.log(2)
}, 0)

channel.port2.postMessage(3)
channel.port2.postMessage(4)

setTimeout(() => {
  console.log(5)
}, 0)

channel.port2.postMessage(6)

setTimeout(() => {
  console.log(7)
}, 0)

channel.port2.postMessage(8)