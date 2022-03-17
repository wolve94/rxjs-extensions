# rxjs-extions

a pack of functions, that are missing or not as easy to use in the default rxjs library

## ```fold```
```typescript
// => all values of the observable are collected into an array when the observable completes
of(1, 2, 3)
    .pipe(fold())
    .subscribe(x => console.log(`Result: '${x}'`));
```

```console
Result: '[1, 2, 3]'
```

## ```filterConsecutiveValues```
```typescript
// => all values, that are equal to their predecessor will be filtered from the stream.
// the code below for example will print the values '1', '2' and '1' (second '1' was filtered)
of(1, 1, 2, 1)
    .pipe(filterConsecutiveValues())
    .subscribe(console.log)
```