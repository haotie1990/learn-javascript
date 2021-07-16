
function defineReactive(target, key, value) {
  let _value = value;
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return _value;
    },
    set: function(val) {
      if (_value === val) {
        return;
      }
      _value = val;
      console.log('Update UI');
    }
  });
}

module.exports = defineReactive;