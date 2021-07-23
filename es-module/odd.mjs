import { even } from './even.mjs';
export function odd(n) {
  return n !== 0 && even(n - 1);
}