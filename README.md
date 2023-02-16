# edit-history
![npm](https://img.shields.io/npm/v/edit-history?label=version) ![NPM](https://img.shields.io/npm/l/edit-history) ![npm bundle size](https://img.shields.io/bundlephobia/min/edit-history)

Manage your undo/redo operations with ease!

## Highlights
* Supports TypeScript!
* Supports Node and browser
* Includes full JSDoc documentation
* Very lightweight!
* Contains tests


## Installation
### NodeJS
```
npm install edit-history --save
```

### Browser
Import the script:
```html
<script src="https://joker876.github.io/edit-history/edit-history.min.js">
```
And import the class from a global object:
```js
new EditHistory(/* capacity */);
```

## Usage

```typescript
import EditHistory from 'edit-history';
```

### Constructor
```typescript
new EditHistory<T = any>(capacity: number);
```
EditHistory constructor takes the history's maximum capacity as its only argument. Capacity is optional, and defaults to `100`.

The type of the elements can also be specified explicitly. The default type is `any`.

```typescript
const history = new EditHistory(50);
// or with specified type
const history = new EditHistory<number>(50);
```

### Members

* `size` - the amount of past changes in the history (changes that can be undone).
* `undoAmount` - alias of `size`.
* `redoAmount` - the amount of future changes in the history (changes that can be redone).
* `capacity` - the maximum number of elements that can be stored in the history. Exceeding this value will cause the elements to be overwritten when pushed. 