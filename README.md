# rxjs-extions

a pack of functions, that are missing or not as easy to use in the default rxjs library

## fold
```typescript
// => all values of the observable are collected into an array when the observable completes
of(1, 2, 3)
    .pipe(fold())
    .subscribe(x => console.log(`Result: '${x}'`));
```

```console
Result: '[1, 2, 3]'
```