import { Observable, OperatorFunction } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map, pairwise, startWith } from 'rxjs/operators';

const emptySymbol: unique symbol = Symbol('empty');

/**
 * removes all values, that are equal to their predecessors
 */
export function filterConsecutiveValues<T>(): OperatorFunction<T, T>;

/**
 * removes all values, that are equal to their predecessors
 *
 * @param areEqual equality comparer for the given values
 */
export function filterConsecutiveValues<T>(
  areEqual?: (prev: T, curr: T) => boolean,
): OperatorFunction<T, T>;

/**
 * removes all values, that are equal to their predecessors
 *
 * @param areEqual equality comparer for the given values.
 * if none passed, the default equality comparer of javascript will be used -> prev === curr
 */
export function filterConsecutiveValues<T>(
  areEqual?: ((prev: T, curr: T) => boolean) | undefined,
): OperatorFunction<T, T> {
  areEqual ??= (p, c) => p === c;
  return (stream: Observable<T>): Observable<T> => {
    return stream.pipe(
      startWith(emptySymbol),
      pairwise(),
      filter(([prev, curr]) => {
        return prev === emptySymbol || !areEqual(prev, curr as T);
      }),
      map(([_, curr]) => curr as T),
    );
  };
}
