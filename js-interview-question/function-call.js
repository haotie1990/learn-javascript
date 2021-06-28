
/**
 * 1. 将函数设置对象的属性
 * 2. 执行函数
 * 3. 删除函数
 * @param {*} thisArg 
 * @returns 
 */
Function.prototype.Call = function(thisArg) {
  var context = thisArg || gloablThis;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  context.fn = this;
  var result = eval('context.fn(' + args + ')');
  delete context.fn;
  return result;
}

function greet(parameters1, parameters2, parameters3) {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply, parameters1, parameters2, parameters3);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.Call(obj, 1, 2, 3);  // cats typically sleep between 12 and 16 hours