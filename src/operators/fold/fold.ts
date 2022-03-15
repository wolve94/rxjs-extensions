import { Observable, OperatorFunction } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

export function fold<T>(): OperatorFunction<T, T[]> {
  return (source: Observable<T>): Observable<T[]> => {
    return source.pipe(
      map((x) => [x]),
      reduce((acc: T[], value: T[]) => [...acc, ...value], []),
    );
  };
}
