import './style.css';

import {
  of,
  map,
  Observable,
  concat,
  mergeScan,
  zip,
  from,
  tap,
  fromEvent,
  interval,
  reduce
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  concatMap,
  zipWith,
  zipAll,
  take,
  debounceTime,
  mergeMap,
  mergeAll,
} from 'rxjs/operators';

const logoEl = document.getElementById('rxjs-logo');
const click$ = fromEvent(logoEl, 'click');
const interval$ = interval(1000);

click$
  .pipe(concatMap(() => interval$.pipe(take(5))))
  .subscribe((v) => console.log(`concatMap click$ interval ${v}`));

click$
  .pipe(
    debounceTime(1000),
    map(() => {
      return ajax.getJSON('https://jsonplaceholder.typicode.com/users/1');
    }),
    mergeAll()
  )
  .subscribe((x) => console.log('mergeAll x', x));

click$
  .pipe(
    debounceTime(1000),
    mergeMap(() => {
      return ajax.getJSON('https://jsonplaceholder.typicode.com/users/1');
    })
  )
  .subscribe((x) => console.log('mergeMap x', x));

