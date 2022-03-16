import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fold } from '../../../src/operators/publish';

describe('fold', () => {
  test('of() -> []', async () => {
    const result = await of<number>().pipe(fold()).toPromise();

    expect(result).toEqual([]);
  });

  test('of(1) -> [1]', async () => {
    const result = await of(1).pipe(fold()).toPromise();

    expect(result).toEqual([1]);
  });

  test('of(1, 2) -> [1, 2]', async () => {
    const result = await of(1, 2).pipe(fold()).toPromise();

    expect(result).toEqual([1, 2]);
  });

  test('non completed observable -> will not terminate until completed', async () => {
    const sbj = new Subject<number>();

    const allResults: number[][] = [];
    const resultPromise = sbj
      .pipe(
        fold(),
        tap((tmpResult) => allResults.push(tmpResult)),
      )
      .toPromise();

    const expectedValues = [1, 2];

    for (const val of expectedValues) {
      sbj.next(val);
    }

    sbj.complete();
    const result = await resultPromise;

    expect(allResults.length).toEqual(1);
    expect(allResults).toEqual([expectedValues]);
    expect(result).toEqual(expectedValues);
  });

  test('observable with a very high amount of elements, should not hit performance mark', async () => {
    const length = 100_000;

    const obs = of(...Array(length).keys()).pipe(fold());
    const startDate = new Date();
    const result = await obs.toPromise();
    const endDate = new Date();

    expect(result.length).toEqual(length);
    const dateDiff = endDate.getTime() - startDate.getTime();
    expect(dateDiff).toBeLessThan(10);
  });
});
