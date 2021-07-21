
/**
 * 基本数据类型：
 * undefined 转换之后仍是 undefined(类型也是 undefined)
 * boolean 值转换之后是字符串 "false"/"true"
 * number 类型(除了 NaN 和 Infinity)转换之后是字符串类型的数值
 * symbol 转换之后是 undefined
 * null 转换之后是字符串 "null"
 * string 转换之后仍是string
 * NaN 和 Infinity 转换之后是字符串 "null"
 * 函数类型：转换之后是 undefined
 * 如果是对象类型(非函数)
 * 如果有 toJSON() 方法，那么序列化 toJSON() 的返回值。
 * 如果属性值中出现了 undefined、任意的函数以及 symbol 值，忽略。
 * 所有以 symbol 为属性键的属性都会被完全忽略掉。
 * 如果是一个数组：如果属性值中出现了 undefined、任意的函数以及 symbol，转换成字符串 "null" ；
 * 如果是 RegExp 对象：返回 {} (类型是 string)；
 * 如果是 Date 对象，返回 Date 的 toJSON 字符串值；
 * 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
 * @param {*} value 
 * @param {*} memory 
 */
function jsonStringify(value, memory) {
  if (typeof value === 'undefined' || typeof value === 'function' || typeof value === 'symbol') {
    return 'undefined';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value !== 'object' && typeof value !== 'function') {
    if (typeof value !== 'string') {
      return (value).toString();
    }
    return `"${(value).toString()}"`;
  }
  if (!memory) {
    memory = new WeakMap();
  }
  // 发现循环引用报错
  if (memory.has(value)) {
    throw new Error('value has cycled object');
  }
  memory.set(value, true);
  if (typeof value.toJSON === 'function') {
    return value.toJSON();
  }
  let result = [];
  // 数组对象
  if (Array.isArray(value)) {
    value.forEach((_value, index, arr) => {
      result.push(`${jsonStringify(_value, memory)}`);
    });
    return `[${result.join(',')}]`.replace(/'/g, '"');
  }
  // Date对象
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return value.toJSON();
  }
  // Regex对象
  if (Object.prototype.toString.call(value) === '[object RegExp]') {
    return '{}';
  }
  // 内置对象类型使用toString处理
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    if (Object.prototype.toString.call(value) !== '[object String]') {
      return (value).toString();
    }
    return `"${(value).toString()}"`;
  }
  // 普通对象
  for (let key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result.push(`"${key}":${jsonStringify(value[key], memory)}`);
    }
  }
  return `{${result.join(',')}}`.replace(/'/g, '"');
}

function jsonStringify1(obj) {
  let type = typeof obj;
  if (type !== "object" || type === null) {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = obj && obj.constructor === Array;
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '"') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}

// console.log(jsonStringify({}));                        // '{}'
// console.log(jsonStringify(true));                      // 'true'
// console.log(jsonStringify("foo"));                     // '"foo"'
console.log(jsonStringify([1, "false", false]));       // '[1,"false",false]'
console.log(jsonStringify({ x: 5 }));                  // '{"x":5}'

// console.log(jsonStringify({x: 5, y: 6}));
// "{"x":5,"y":6}"

console.log(jsonStringify([new Number(1), new String("false"), new Boolean(false)]));
// '[1,"false",false]'

// TODO 有问题，不符合预期
// console.log(jsonStringify({x: undefined, y: Object, z: Symbol("")}));
// '{}'

// console.log(jsonStringify([undefined, Object, Symbol("")]));
// '[null,null,null]'

// console.log(jsonStringify({[Symbol("foo")]: "foo"}));
// '{}'

// jsonStringify({[Symbol.for("foo")]: "foo"}, [Symbol.for("foo")]);
// '{}'

// jsonStringify(
//     {[Symbol.for("foo")]: "foo"},
//     function (k, v) {
//         if (typeof k === "symbol"){
//             return "a symbol";
//         }
//     }
// );


// undefined

// 不可枚举的属性默认会被忽略：
// console.log(jsonStringify(
//     Object.create(
//         null,
//         {
//             x: { value: 'x', enumerable: false },
//             y: { value: 'y', enumerable: true }
//         }
//     )
// ));
// "{"y":"y"}"

// 循环引用报错
// const obj = {
//   name: "obj"
// };
// obj.newKey = obj;
// jsonStringify(obj);
