
function jsonp(url, jsonpCallback, sueccess) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;
  window[jsonpCallback] = function(data) {
    success && success(data);
    script.remove();
  }
  document.body.appendChild(script);
}