import { odd } from './odd.mjs'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}