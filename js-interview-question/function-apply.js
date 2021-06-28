
Function.prototype.Apply = function(thisArg) {
  var context = thisArg || gloablThis;
  context.fn = this;
  var args = [];
  if (arguments.length > 1) {
    var _arguments = arguments[1];
    for (var i = 0; i < _arguments.length; i++) {
      args.push('arguments[1][' + i + ']');
    }
  }
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

greet.Apply(obj, [1, 2, 3]);  // cats typically sleep between 12 and 16 hours
