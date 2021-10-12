import { P, sleep } from '../../util/asyncUtil';

function f(x) {
  return function work() {
    return x;
  };
}

async function main() {
  f('create p')();
  const p = P(f('start wait'), sleep(1000), f('end wait'));
  await 'start';
  f('START')();
  await Promise.all([
    P(f('A1'), f('A2'), f('A3')),
    P(f('B1'), f('B2'), f('B3')),
    p
  ]);
  f('END')();
}
main();