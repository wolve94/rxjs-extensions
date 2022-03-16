import { Observable, OperatorFunction } from 'rxjs';
import { reduce } from 'rxjs/operators';

export function fold<T>(): OperatorFunction<T, T[]> {
  return (source: Observable<T>): Observable<T[]> => {
    return source.pipe(
      reduce((acc: T[], value) => {
        acc.push(value);
        return acc;
      }, [] as T[]),
    );
  };
}
