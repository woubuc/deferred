# Deferred
A Promise that can be resolved externally

[![npm](https://img.shields.io/npm/v/@woubuc/deferred)](https://www.npmjs.com/package/@woubuc/deferred)
[![MIT licensed](https://img.shields.io/badge/license-MIT-green)](https://github.com/woubuc/deferred/blob/master/LICENSE.txt)
[![install size](https://packagephobia.com/badge?p=@woubuc/deferred)](https://packagephobia.com/result?p=@woubuc/deferred)
![Typescript type definitions included](https://img.shields.io/npm/types/@woubuc/deferred)

## Installation
```
yarn add @woubuc/deferred
```

The library is written in Typescript to types are included.

## Usage
```typescript
import Deferred from '@woubuc/deferred';

// Use it as a regular promise
let promise = new Deferred((resolve, reject) => {
    resolve('done');
});

// Or resolve it externally
promise.resolve('done');

// Or omit the promise body altogether
let deferred = new Deferred();
deferred.resolve('done');
```

#### API
```typescript
let deferred = new Deferred<T>(promiseCallback);
```
Creates a new Deferred promise. Takes a `(resolve, reject)` callback just like a regular promise.

- `<T>`: Type of the promise resolve value

```typescript
deferred.resolve(value : T);
```
Resolves the promise with `value`

```typescript
deferred.reject(error ?: any);
```
Rejects the promise with an optional `error`.

#### Notes
- Extends the native `Promise` object, so it should be fully compatible with regular promises
- Resolving and rejecting follows the same rules as with regular promises (i.e. a promise can only be settled once)
- Resolving the promise externally will not stop or code inside the constructor callback from executing
