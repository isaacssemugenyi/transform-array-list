Transform an array of objects with duplicate objects into single objects with nested arrays of vital data

- [Usage](#usage) - [transformList](#transformlist) - [includesAll](#includesall) - [objToArray](#objtoarray) - [arrayToObject](#arraytoobject)
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

#### arrayToObject

```js
const { arrayToObject } = require('transform-array-list');
```

- options

  1. default option

  ```js
  const result = arrayToObject([1, 2, 3]);
  // type is missing, so 0 will be used as the type and object values will be returned
  //output -> [{ 0: 1 }, { 1: 2 }, { 2: 3 }]
  ```

  2. second option

  ```js
  const result = arrayToObject(
    [
      ['Male', 'Isaac'],
      ['Female', 'annet'],
    ],
    0
  );
  // type is specified as 0
  //output -> [{ 0: ['Male', 'Isaac'] }, { 1: ['Female', 'annet'] }]
  ```

  3.  third option

  ```js
  const result = arrayToObject(['one', 'two', 'three'], 1);
  // type is specified as 1, array of objects returned with key 'item'
  //output -> [{ item: 'one' },{ item: 'two' },{ item: 'three' },]
  ```

  4. forth option

  ```js
  const result = arrayToObject(
    [
      'address',
      { default: 'Kampala', home: 'Mpigi', work: 'Wakiso' },
      'bio',
      { firstName: 'Isaac', lastName: 'Johns' },
    ],
    2
  );
  // type is 2, current element is used as key and proceeding element is set as the value in the returned array of object

  // output -> [{ address: { default: 'Kampala', home: 'Mpigi', work: 'Wakiso' } },{ bio: { firstName: 'Isaac', lastName: 'Johns' } },]
  ```

  5. firth option

  ```js
  const result = arrayToObject(
    [
      [5, { name: 'isaac' }],
      [7, { name: 'annet' }],
    ],
    3
  );
  // type is 3, main array elements (arrays as well), each nested array, its first element is set as key and second element as value

  // output -> [{ 5: { name: 'isaac' } }, { 7: { name: 'annet' } }]
  ```

### Note

- `require` is only supported
- Written in Javascript (plan to re-write it in typescript later)
- More error handling needed to compare whether fieldsArray element exist in the itemsList
