
/**
 * 请实现一个 cacheRequest 方法，保证发出多次同一个 ajax 请求时都能拿到数据，而实际上只发出一次请求
 */

// ! 问题一：请求失败后需要将缓存里面的数据清除，否则后续请求将一直是失败状态
function fetch(url) {
  console.log('call fetch by:%s', url);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('request: ' + url + ' success');
    }, 1000);
  });
}
function cacheRequest(url) {
  if (cacheRequest.cache.has(url)) {
    return cacheRequest.cache.get(url);
  }
  const request = fetch(url);
  cacheRequest.cache.set(url, request);
  return request;
}

cacheRequest.cache = new Map();

const req1 = cacheRequest('https://www.vipkid.com');
req1.then(data => console.log('req1:%s', data));

const req2 = cacheRequest('https://www.vipkid.com');
req2.then(data => console.log('req2:%s', data));

const req3 = cacheRequest('https://www.vipkid.com');
req3.then(data => console.log('req3:%s', data));

const req4 = cacheRequest('https://www.vipkid.com');
req4.then(data => console.log('req4:%s', data));