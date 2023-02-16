import CircularStack from 'circular-stack';
import { FixedStack } from 'mnemonist';
import { isDefined } from 'simple-bool';

/**
 * The `EditHistory` class provides a way to manage multiple undo/redo operations.
 * 
 * Stores a limited number of changes. If the limit is exceeded, new changes will overwrite oldest changes automatically.
 */
export default class EditHistory<T = any> {
    private _pastChanges!: CircularStack<T>;
    private _currentChange: T | undefined;
    private _futureChanges!: FixedStack<T>;

    /**
     * Initializes the EditHistory.
     * 
     * @param {number} capacity - the number of past changes stored before being overwritten.
     */
    constructor(private _capacity: number = 100) {
        this._pastChanges = new CircularStack(this._capacity);
        this._futureChanges = new FixedStack(Array, this._capacity);
    }

    /**
     * Moves the current change to past changes, and sets the value of the current change to the given `EditHistoryItem` object.
     * Clears all the future changes.
     * 
     * @param item The `EditHistoryItem` to be added.
     */
    push(item: T): void {
        if (isDefined(this._currentChange)) {
            this._pastChanges.push(this._currentChange);
        }
        this._futureChanges.clear();
        this._currentChange = item;
    }

    /**
     * Edits the current change by replacing it with the given item.
     * Clears all the future changes.
     * 
     * @param item The item to replace the current change with.
     */
    edit(item: T): void {
        this._futureChanges.clear();
        this._currentChange = item;
    }

    /**
     * Returns the current change, without moving it anywhere.
     */
    peek(): T | undefined {
        return this._currentChange;
    }

    /**
     * Pops the latest change from the past changes, and sets it as the current change.
     * If there already is a current change, it is pushed to the future changes stack.
     * 
     * @returns The latest change that was popped from the past changes, or `undefined` if it was empty.
     */
    pop(): T | undefined {
        const popped = this._pastChanges.pop();
        if (!isDefined(popped)) return;
        if (isDefined(this._currentChange)) {
            this._futureChanges.push(this._currentChange);
        }
        this._currentChange = popped;
        return popped;
    }
    /**
     * Pops the latest change from the past changes, and sets it as the current change.
     * If there already is a current change, it is pushed to the future changes stack.
     * 
     * @returns The latest change that was popped from the past changes, or `undefined` if it was empty.
     */
    undo(): T | undefined {
        return this.pop();
    }

    /**
     * Removes and returns the latest change that was popped using the {@link pop} method, if there is any.
     * 
     * @returns The latest change that was popped using the {@link pop} method, or `undefined` if there are no future changes.
    */
    unpop(): T | undefined {
        const popped = this._futureChanges.pop();
        if (!isDefined(popped)) return;
        if (isDefined(this._currentChange)) {
            this._pastChanges.push(this._currentChange);
        }
        this._currentChange = popped;
        return popped;
    }
    /**
     * Removes and returns the latest change that was popped using the {@link pop} method, if there is any.
     * 
     * @returns The latest change that was popped using the {@link pop} method, or `undefined` if there are no future changes.
    */
    redo(): T | undefined {
        return this.unpop();
    }
    
    /**
     * Returns the maximum number of elements that can be stored in the history.
     */
    get capacity(): number {
        return this._capacity;
    }
    
    /**
     * Returns the amount past changes (changes that can be undone).
     */
    get size(): number {
        return this._pastChanges.size;
    }
    
    /**
     * Returns the amount past changes (changes that can be undone).
     */
    get undoAmount(): number {
        return this.size;
    }
    
    /**
     * Returns the amount future changes (changes that can be redone).
     */
    get redoAmount(): number {
        return this._futureChanges.size;
    }
}