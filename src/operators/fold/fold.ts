import { Observable, OperatorFunction } from 'rxjs';
import { reduce } from 'rxjs/operators';

/**
 * creates an array out of all values of the source observable as soon as it has completed
 *
 * @example of(1, 2, 3, 4).pipe(fold()).subscribe(console.log) -> would print the array [1, 2, 3, 4]
 * => Empty observable are converted into empty arrays
 */
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
