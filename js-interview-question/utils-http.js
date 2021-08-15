
function request(url, method, params) {
  return new Promise(function(resolve, reject) {
    if (!url) {
      return reject(new Error('url not found'))
    }
    const xhr = new XMLHttpRequest();
    method = method || 'GET';
    if (method === 'GET') {
      let search = [];
      Objet.keys(params).forEach(key => {
        search.push(`${key}=${encodeURIComponent(params[key])}`);
      });
      url = url + '?' + search.join('&');
    }
    xhr.open(method, url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        }
      }
    }
    const isNeedRequestBody = !['GET', 'HEAD'].includes(method.toUpperCase());
    xhr.send(isNeedRequestBody ? params : null);
  });
}