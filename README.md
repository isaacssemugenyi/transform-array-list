Transform an array of objects with duplicate objects into single objects with nested arrays of vital data

- [Usage](#usage)
      - [transformList](#transformlist)
      - [includesAll](#includesall)
      - [objToArray](#objtoarray)
    - [Note](#note)

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

  #### objToArray

- requires an object with properties and a type (number)
- first argument value will be an object
- second argument is a number 0, 1, 2, 3 and is optional, returning `object values` when not specified

  ```js
  const { objToArray } = require('transform-array-list');
  ```

- options

  1. default option

  ```js
  const result = objToArray({ id: 1, name: 'Isaac', age: 30 });
  // type is missing, so 0 will be used as the type and object values will be returned
  //output -> [1, 'Isaac', 30]
  ```

  2. second option

  ```js
  const result = objToArray({ id: 1, name: 'Isaac', age: 30 }, 0);
  // type is specified as 0, object values will be returned
  //output -> [1, 'Isaac', 30]
  ```

  3.  third option

  ```js
  const result = objToArray({ id: 1, name: 'Isaac', age: 30 }, 1);
  // type is specified as 1, object keys will be returned
  //output -> ['id', 'name', 'age']
  ```

  4. forth option

  ```js
  const result = objToArray({ id: 1, name: 'Isaac', age: 30 }, 2);
  // type is 2, object entries returned as nested arrays
  // output -> [['id', 4], ['name', 'Isaac'], ['age', 25]]
  ```

  5. firth option

  ```js
  const result = objToArray({ id: 1, name: 'Isaac', age: 30 }, 3);
  // type is 3, object entries returned flattened
  // output -> ['id', 4, 'name', 'Isaac', 'age', 25]
  ```

### Note

- `require` is only supported
- Written in Javascript (plan to re-write it in typescript later)
- More error handling needed to compare whether fieldsArray element exist in the itemsList
