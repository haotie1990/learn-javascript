let name = 'moduleC:' + Date.now();

module.exports = function() {
  console.log('loading module c');
  return name;
}