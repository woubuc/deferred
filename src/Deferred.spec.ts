import Deferred from './Deferred';

describe('promise callback', () => {
	test('resolve', async () => {
		let promise = new Deferred((resolve, reject) => {
			resolve('resolved');
		});

		await expect(promise).resolves.toBe('resolved');
	});

	test('reject', async () => {
		let promise = new Deferred((resolve, reject) => {
			reject('rejected');
		});

		await expect(promise).rejects.toBe('rejected');
	});
});

describe('external with callback', () => {
	test('resolve', async () => {
		let fn = jest.fn();
		let promise = new Deferred<string>(() => fn());

		promise.resolve('resolved');

		await expect(promise).resolves.toBe('resolved');
		expect(fn).toHaveBeenCalled();
	});

	test('reject', async () => {
		let fn = jest.fn();
		let promise = new Deferred<string>(() => fn());

		promise.reject('rejected');

		await expect(promise).rejects.toBe('rejected');
		expect(fn).toHaveBeenCalled();
	});
});

describe('external without callback', () => {
	test('resolve', async () => {
		let promise = new Deferred<string>();
		promise.resolve('resolved');

		await expect(promise).resolves.toBe('resolved');
	});

	test('resolve without value', async () => {
		let promise = new Deferred<void>();
		promise.resolve();

		await expect(promise).resolves.toBeUndefined();
	});

	test('reject', async () => {
		let promise = new Deferred<string>();
		promise.reject('rejected');

		await expect(promise).rejects.toBe('rejected');
	});

	test('reject without value', async () => {
		let promise = new Deferred<void>();
		promise.reject();

		await expect(promise).rejects.toBeUndefined();
	});
});
