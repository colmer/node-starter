import { log } from 'util';
import { a as count } from './include';

console.log('NODE_ENV', process.env.NODE_ENV);

let x = 0;
setInterval(async () => {
  if (x >= count) {
    // clearInterval(interval);
    throw new Error('Errrrroooorrr!!');
  }

  // const a = 5 ** 3;
  await log('world', ++x);
}, 1000);

log('hello');
