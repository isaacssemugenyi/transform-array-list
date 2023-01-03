Usage

```js
const TransformArrayList = require('transform-array-list');
// or
const { transformList } = require('transform-array-list');

// List to Transform
const itemList = [
  { id: 1, name: 'Isaac', age: 10, address: 'Kampala' },
  { id: 2, name: 'Annet', age: 20, address: 'Wakiso' },
  { id: 1, name: 'Phesto', age: 13, address: 'Mutundwe' },
];

// List of fields Array to return in the nested arrays
const fieldsArray = ['name', 'address'];

// Identifier -> One used as key of reference
const identifier = 'id';

// optional lookup list key (default is lookup)
const lookup = 'details';

// const TransformArrayList = require('transform-array-list');
const result = TransformArrayList.transformList(
  itemList,
  fieldsArray,
  identifier,
  lookup
);

// if const { transformList } = require('transform-array-list');
const result = transformList(itemList, fieldsArray, identifier, lookup);

console.log(result);

//Output

[
  {
    id: 1,
    name: 'Isaac',
    age: 10,
    address: 'Kampala',
    details: [
      {
        name: 'Isaac',
        address: 'Kampala',
      },
      {
        name: 'Phesto',
        address: 'Mutundwe',
      },
    ],
  },
  {
    id: 2,
    name: 'Annet',
    age: 20,
    address: 'Wakiso',
    details: [
      {
        name: 'Annet',
        address: 'Wakiso',
      },
    ],
  },
];
```
