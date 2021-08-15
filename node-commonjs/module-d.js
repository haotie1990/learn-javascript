let count = 0;
setTimeout(function() {
  console.log('change moduleD count');
  count = 1;
}, 10);
module.exports = count;