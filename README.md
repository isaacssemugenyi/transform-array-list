Transform an array of objects with duplicate objects into single objects with nested arrays of vital data

[transformList](#transformlist)
[includesAll](#includesall)
[Vital Notes](#note)

# Usage

#### transformList

```js
const TransformArrayList = require('transform-array-list');
// or
const { transformList, includesAll } = require('transform-array-list');

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
    age: 10,
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
    age: 20,
    details: [
      {
        name: 'Annet',
        address: 'Wakiso',
      },
    ],
  },
];
```

#### includesAll

- require includes from transformArrayList
- first argument

  ```js
  const arrToCheckWith = ['isaac', 'tom', 'jack'];
  ```

- second argument

  ```js
  const arrToCompare = ['tom', 'isaac'];
  ```

- call the function and store passing these params and store the result in any variable

  ```js
  const result = includesAll(arrToCheckWith, arrToCompare);
  console.log(result);

  //output
  true;
  ```

### Note

- `require` is only supported
- Written in Javascript (plan to re-write it in typescript later)
- More error handling needed to compare whether fieldsArray element exist in the itemsList
