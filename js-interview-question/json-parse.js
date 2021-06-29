
/**
 * ! 直接调用 eval 会存在安全问题，如果数据中可能不是 json 数据，而是可执行的 JavaScript 代码，那很可能会造成 XSS 攻击
 * @param {string} string 
 * @returns 
 */
function jsonParse(string) {
  return eval('(' + string + ')');
}

function jsonParse1(string) {
  return (new Function('return' + string))();
}