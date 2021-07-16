/**
 * 实现Function 原型的bind方法，使得以下程序最后能输出“success”
 */
 function Animal(name,color){
  this.name = name;
  this.color = color;
}
Animal.prototype.say = function(){
  return `I'm ${this.color} ${this.name}`;
}
Function.prototype.bind = function(){
  const thisArgs = [].shift.call(arguments);
  const args = [].slice.call(arguments, 0);
  const self = this;
  const func = function() {
    const _args = [].slice.call(arguments, 0);
    // func作为构造函数调用时,this是实例对象,此时构造函数的原型链在实例对象的原型链上
    const context = this instanceof func ? this : thisArgs;
    return self.apply(context, args.concat(_args));
  } 
  func.prototype = this.prototype;  
  return func;
}
const Cat = Animal.bind(null,'cat');
const cat = new Cat('white');
if(cat.say() === "I'm white cat" && cat instanceof Cat && cat instanceof Animal){
  console.log('sunccess');
}