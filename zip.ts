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

const views = ['country','overview','icb'];

const aggregateReport = (views: any) => (getExecData: (reportType: string) => Observable<Partial<any>>) => {
  const views$ = of(...views);
  const payloads$$ = concat(...views.map(v => getExecData(v)));
  const apiPayloads$ = zip(views$, payloads$$).pipe(
      map(([k, v]) => ({ [k]: v })),
      reduce((a, c) => ({ ...a, ...c }))
  );
} 
