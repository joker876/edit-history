import EditHistory from './index.js';

describe('EditHistory', () => {
    let history: EditHistory<number>;

    beforeEach(() => {
        history = new EditHistory<number>(3);
    });

    describe('push', () => {
        it('should add an item to the history', () => {
            history.push(1);
            expect(history.peek()).toEqual(1);
        });

        it('should clear future changes', () => {
            history.push(1);
            history.push(2);
            history.pop();
            history.push(3);
            history.push(4);
            expect(history.redoAmount).toEqual(0);
        });

        it('should overwrite oldest changes when capacity is reached', () => {
            history.push(1);
            history.push(2);
            history.push(3);
            history.push(4);
            expect(history.undoAmount).toEqual(3);
            expect(history.redoAmount).toEqual(0);
            expect(history.peek()).toEqual(4);
        });
    });

    describe('edit', () => {
        it('should replace the current change', () => {
            history.push(1);
            history.edit(2);
            expect(history.peek()).toEqual(2);
        });

        it('should clear future changes', () => {
            history.push(1);
            history.push(2);
            history.pop();
            history.edit(3);
            history.push(4);
            expect(history.redoAmount).toEqual(0);
        });
    });

    describe('peek', () => {
        it('should return the current change', () => {
            history.push(1);
            expect(history.peek()).toEqual(1);
        });

        it('should return undefined if there is no current change', () => {
            expect(history.peek()).toBeUndefined();
        });
    });

    describe('pop', () => {
        it('should return and set the latest change as the current change', () => {
            history.push(1);
            history.push(2);
            expect(history.pop()).toEqual(1);
            expect(history.peek()).toEqual(2);
        });

        it('should move the current change to future changes', () => {
            history.push(1);
            history.push(2);
            history.pop();
            expect(history.redoAmount).toEqual(1);
        });

        it('should return undefined if there are no past changes', () => {
            expect(history.pop()).toBeUndefined();
        });
    });

    describe('undo', () => {
        it('should be an alias for pop', () => {
            const popSpy = spyOn(history, 'pop');
            history.undo();
            expect(popSpy).toHaveBeenCalled();
        });
    });

    describe('unpop', () => {
        it('should return and set the latest future change as the current change', () => {
            history.push(1);
            history.push(2);
            history.pop();
            history.unpop();
            expect(history.undoAmount).toEqual(2);
            expect(history.peek()).toEqual(1);
        });

        it('should move the current change to past changes', () => {
            history.push(1);
            history.push(2);
            history.pop();
            history.unpop();
            expect(history.redoAmount).toEqual(1);
        });

        it('should return undefined if there are no future changes', () => {
            expect(history.unpop()).toBeUndefined();
        });
    });

    describe('redo', () => {
        it('should be an alias for unpop', () => {
            const unpopSpy = spyOn(history, 'unpop');
            history.redo();
            expect(unpopSpy).toHaveBeenCalled();
        });
    });

    describe('capacity', () => {
        it('should return the capacity value passed in the constructor', () => {
            expect(history.capacity).toEqual(3);
        });
    });

    describe('size', () => {
        it('should return 0 when no changes have been made', () => {
            expect(history.size).toEqual(0);
        });

        it('should return the number of changes made', () => {
            history.push(1);
            expect(history.size).toEqual(1);
            history.push(2);
            expect(history.size).toEqual(2);
        });
    });

    describe('push, pop, unpop', () => {
        it('should pop the most recently pushed item', () => {
            history.push(1);
            history.push(2);
            history.push(3);
            expect(history.pop()).toBe(3);
        });

        it('should push the popped item to the future changes stack when undoing', () => {
            history.push(1);
            history.push(2);
            history.push(3);
            history.pop();
            expect(history.unpop()).toBe(3);
        });
        it('should not push the item to future changes when undoing after editing the current change', () => {
            history.push(1);
            history.push(2);
            history.push(3);
            history.edit(4);
            history.pop();
            expect(history.unpop()).toBe(4);
        });
    });
});
