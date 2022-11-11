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
  reduce,
  merge
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

const getData = (fetchImp = fetch) => (id: string) => (endpoint: string) => {
  return new Observable((observer) => {
    fetchImp(`https://jsonplaceholder.typicode.com/${endpoint}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        observer.next(data);
        observer.complete();
      });
  });
}

enum Apis {
  TODO = 'todos',
  USER = 'users'
}
const getDataById = getData(fetch)('2');
// @ts-ignore
const namespaces$ = of(...Object.values(Apis));
// @ts-ignore
const apis$ = concat(...Object.values(Apis).map(v => getDataById(v)));

const zipped$ = zip(namespaces$, apis$)
  .pipe(
    map(([k,v]) => ({[k]: v})),
    reduce((a,c) => ({...a, ...c}))
  );

const rest$ = of({dude: 'dudeman'});

merge(zipped$, rest$).pipe(
  reduce((a,c) => ({...a, ...c}))
).subscribe((m) => console.log('merged', m));

