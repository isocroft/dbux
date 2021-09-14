import { IdleTime, N, startProduce, finishProduce, startConsume, finishConsume, hasSpace, hasItems, getProduceTime, getConsumeTime, } from './producer_consumer_base';
import { waitTicksPromise, repeatPromise } from 'asyncUtil';

/** ###########################################################################
 * Basic functions
 *  #########################################################################*/

function idle() {
  return waitTicksPromise(IdleTime);
}

function consume() {
  startConsume();
  return waitTicksPromise(getConsumeTime())
    .then(finishConsume);
}

function produce() {
  startProduce();
  return waitTicksPromise(getProduceTime())
    .then(finishProduce);
}

function producer(n) {
  return repeatPromise(n, () => {
    if (hasSpace()) {
      return produce();
    }
    else {
      return idle();
    }
  });
}

function consumer(n) {
  return repeatPromise(n, () => {
    if (hasItems()) {
      return consume();
    }
    else {
      return idle();
    }
  })
}

/** ###########################################################################
 * Main
 *  #########################################################################*/

producer(N);
// producer(N);
// consumer(N);
consumer(2*N);