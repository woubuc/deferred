/** Promise resolve() callback */
type Resolver<T> = (value : T | PromiseLike<T>) => void;

/** Promise reject() callback */
type Rejecter = (reason ?: any) => void;

/**
 * Deferred promise that can be resolved or rejected externally
 */
export default class Deferred<T> extends Promise<T> {

	/** The resolve() callback in the inner promise */
	private readonly resolver : Resolver<T>;

	/** The reject() callback in the inner promise */
	private readonly rejecter : Rejecter;

	/**
	 * Creates a new Deferred promise
	 */
	public constructor(executor ?: (resolve : Resolver<T>, reject : Rejecter) => void) {
		// Store the resolver and rejecter in a local variable first
		// because we're only allowed to access `this` after `super()`
		// has been called.
		let resolver : Resolver<T>;
		let rejecter : Rejecter;

		super((resolve, reject) => {
			resolver = resolve;
			rejecter = reject;

			if (executor !== undefined) {
				executor(resolve, reject);
			}
		});

		// These values will be initialised because the Promise callback
		// in `super()` runs immediately.
		this.resolver = resolver!;
		this.rejecter = rejecter!;
	}

	/**
	 * Resolves the Deferred promise
	 */
	public resolve(value : T) : void {
		this.resolver(value);
	}

	/**
	 * Rejects the Deferred promise
	 */
	public reject(reason ?: any) : void {
		this.rejecter(reason);
	}
}
