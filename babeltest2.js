import { a } from './compiled1';

const b = { c: 3 };
let g = {
  a,
  ...b,
};

console.info(g);

export default g;
