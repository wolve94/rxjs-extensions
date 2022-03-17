import { of } from 'rxjs';
import { filterConsecutiveValues } from '../../../src/operators/filter/filter-consecutive-values';
import { fold } from '../../../src/operators/publish';

describe('filter-consecutive-values', () => {
  test('of() -> no values emitted', async () => {
    const result = await of<number>()
      .pipe(filterConsecutiveValues(), fold())
      .toPromise();
    expect(result).toEqual([]);
  });

  test('of(1) -> [1]', async () => {
    const result = await of<number>(1)
      .pipe(filterConsecutiveValues(), fold())
      .toPromise();
    expect(result).toEqual([1]);
  });

  test('of(1, 2) -> [1]', async () => {
    const result = await of<number>(1, 2)
      .pipe(filterConsecutiveValues(), fold())
      .toPromise();
    expect(result).toEqual([1, 2]);
  });

  test('of(1, 1) -> [1]', async () => {
    const result = await of<number>(1, 1)
      .pipe(filterConsecutiveValues(), fold())
      .toPromise();
    expect(result).toEqual([1]);
  });

  test('of(1, 1, 2) -> [1, 2]', async () => {
    const result = await of<number>(1, 1, 2)
      .pipe(filterConsecutiveValues(), fold())
      .toPromise();
    expect(result).toEqual([1, 2]);
  });

  test('of(1, 1, 2, 1) -> [1, 2, 1]', async () => {
    const result = await of<number>(1, 1, 2, 1)
      .pipe(filterConsecutiveValues(), fold())
      .toPromise();
    expect(result).toEqual([1, 2, 1]);
  });

  test('of(1, 1, 1, 1, 1) -> [1]', async () => {
    const result = await of<number>(1, 1, 1, 1, 1)
      .pipe(filterConsecutiveValues(), fold())
      .toPromise();
    expect(result).toEqual([1]);
  });

  test('custom equality function passed, that compares only first char of a string. duplicates are evaluated by first char only', async () => {
    const result = await of<string>('abc', 'abd', 'def', 'abc')
      .pipe(
        filterConsecutiveValues(
          (prev, curr) => prev.charAt(0) === curr.charAt(0),
        ),
        fold(),
      )
      .toPromise();

    expect(result).toEqual(['abc', 'def', 'abc']);
  });
});
