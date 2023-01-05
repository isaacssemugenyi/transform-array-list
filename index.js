/**
 * @function transformList
 * @param { itemList, fieldsArray, identifier, lookupArray}
 * @description itemList: An array of objects with data from a data source
 * @example [{id: 1, name: 'Isaac', age: 10, address: 'Kampala'}, {id: 2, name: 'Annet', age: 20, address: 'Wakiso'}, {id: 1, name: 'Phesto', age: 13, address: 'Mutundwe'}]
 * @description fieldsArray: An array of strings (fields to pull from itemList)
 * @example ['name', 'address']
 * @description identifier: An identifier from the itemList to use for construction
 * @example id
 * @description lookupArray: A name that will be used as a key to the nested array list constructed, default is 'lookup'
 * @example details
 * @returns A new array
 * @example [
 * {
 *  id: 1,
 *  age: 10,
 *  details: [
 *      {
 *          name: 'Isaac',
 *          address: 'Kampala'
 *      },
 *      {
 *          name: 'Phesto',
 *          address: 'Mutundwe'
 *      }
 *  ]},
 *  {
 *   id: 2,
 *   age: 20,
 *   details: [
 *      {
 *          name: 'Annet',
 *          address: 'Wakiso'
 *      }
 *   ]
 *  }
 * ]
 */
const transformList = (
  itemList, // list to transform
  fieldsArray, // fields to lookout from the array list
  identifier, // identifier like a list id
  lookupArray = 'lookup' //array name for the sub list
) => {
  let hashTable = {};
  let result = [];
  if (!Array.isArray(itemList)) {
    throw new Error('First argument should be an array');
  }
  // check if objects in itemList is an object
  if (itemList.length <= 0) {
    throw new Error('First array can not be empty');
  }
  if (!Array.isArray(fieldsArray)) {
    throw new Error('Second argument should be an array');
  }
  // check if elements in fieldsArray are strings
  if (fieldsArray.length <= 0) {
    throw new Error('Second array can not be empty');
  }
  if (
    typeof itemList[0][identifier] !== 'number' &&
    typeof itemList[0][identifier] !== 'string'
  ) {
    throw new Error('Identifier should be a number or a string');
  }

  for (let item of itemList) {
    // single item in the itemList
    let options = {}; // options from the fieldsArray as checked against the fields in the itemList
    for (let field of fieldsArray) {
      options = { ...options, [field]: item[field] };
    }

    if (item[identifier] === hashTable[item[identifier]]) {
      // checking identifier field from item with fields in the hasHTable
      result[
        result.findIndex(
          (currentItem) => currentItem[identifier] == item[identifier]
        )
      ][lookupArray].push(options); // push the options object into the lookupArray list
    } else {
      item = {
        // set an item to equal to all item fields and options objects into the new array
        ...item,
        [lookupArray]: new Array(options),
      };

      // Delete all fields in the fieldsArray from the main list
      for (let value of fieldsArray) {
        delete item[value];
      }

      hashTable = { ...hashTable, [item[identifier]]: item[identifier] }; // spread the hashTable existing fields and add a new identifier for the new field
      result.push(item); // push the new item into the result
    }
  }

  return result; // return the results fomulated
};

/**
 * @function includesAll
 * @param arrToCheckWith string[] | integer[] | boolean[]
 * @param arrToCompare string[] | integer[] | boolean[]
 * @description function that is meant to compare arrToCompare with arrToCheckWith, if all elements in arrToCompare exists in arrToCheckWith, it returns true else false
 * @example includesAll(['isaac', 'jane', 'john', 'jean', 'peninah' ], ['jane', 'jean']) -> output is 'true'
 * @example includesAll(['isaac', 'jane', 'john', 'jean', 'peninah' ], ['jane', 'phillip']) -> output is 'false'
 * @returns boolean (true || false)
 */

const includesAll = (arrToCheckWith, arrToCompare) => {
  if (!Array.isArray(arrToCheckWith) || !Array.isArray(arrToCompare))
    throw new Error('Only arrays are supported');

  if (arrToCheckWith.length <= 0 || arrToCompare.length <= 0)
    throw new Error('Empty arrays are not supported');

  if (typeof arrToCheckWith[0] === 'object' || Array.isArray(arrToCheckWith[0]))
    throw new Error(
      'Only arrays of strings, integers or boolean are supported'
    );

  if (typeof arrToCompare[0] === 'object' || Array.isArray(arrToCompare[0]))
    throw new Error(
      'Only arrays of strings, integers or boolean are supported'
    );

  let results = [];
  for (let item of arrToCompare) {
    if (!arrToCheckWith.includes(item)) {
      results.push(false);
    }
    results.push(true);
  }
  const finalResults = [...new Set(results)];
  return finalResults.includes(false) ? false : true;
};

/**
 * @function objToArray
 * @param {obj, type}
 * @summary obj is an object, and type is optional with 0 as default, range 0 to 3 as a number
 * @summary function takes an object with a single depth
 * @description a function meant to work on an object and return an array of values from the object
 * @example objToArray({ id: 4, name: 'Isaac', age: 25})
 * @returns type: 0 -> [4, 'Isaac', 25], 1 -> ['id', 'name', 'age'], 2 -> [['id', 4], ['name', 'Isaac'], ['age', 25]], 3 -> ['id', 4, 'name', 'Isaac', 'age', 25]
 */
const objToArray = (obj, type = 0) => {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error('An object is expected');
  }

  if (JSON.stringify(obj) === '{}') {
    throw new Error('Object can not be empty');
  }

  if (typeof type !== 'number') {
    throw new Error('Type can only be a number either 0, 1, 2, 3');
  }

  if (type < 0 || type > 3) {
    throw new Error('Type can only be either 0, 1, 2, 3');
  }

  const options = {
    0: Object.values(obj),
    1: Object.keys(obj),
    2: Object.entries(obj),
    3: Object.entries(obj).flat(),
  };

  return options[type];
};

/**
 * @function arrayToObject
 * @param {array, type}
 * @summary array is an array, and type is optional with 0 as default, range 0 to 3 as a number
 * @summary function takes an array
 * @description a function meant to work on an array of integers, strings, or 2D array and return an array of object
 * @example arrayToObject([1, 2, 3])
 * @example arrayToObject([1, 2, 3], 0)
 * @example arrayToObject([1, 2, 3], 1)
 * @example arrayToObject([1, 2, 3, 4], 2)
 * @example arrayToObject([[1, 2], [3, 4]], 3)
 * @returns type:
 * 0 -> [{ 0: 1 }, { 1: 2 }, { 2: 3 }],
 * 1 -> [{ item: 1 }, { item: 2 }, { item: 3 }],
 * 2 -> [{ 1: 2 }, { 3: 4 }], Here if array length is odd, the last element is removed
 * 3 -> [{ 1: 2 }, { 3: 4 }]
 */
const arrayToObject = (array, type = 0) => {
  if (!Array.isArray(array)) {
    throw new Error('An array is expected as a first argument');
  }

  if (array.length <= 0) {
    throw new Error('An array should not be empty');
  }

  if (typeof type !== 'number') {
    throw new Error('Type can only be a number either 0, 1, 2, 3');
  }

  if (type < 0 || type > 3) {
    throw new Error('Type can only be either 0, 1, 2, 3');
  }

  if (type === 2 && array.length % 2 !== 0) array.pop();

  if (type === 3 && (array[0].length <= 0 || array[0].length > 2)) {
    throw new Error('With type 3, elements of array should each be length 2');
  }

  const format2IndexObj = (list) => {
    const result = [];

    for (let i = 0; i < list.length; i += 2) {
      result.push({ [list[i]]: list[i + 1] });
    }
    return result;
  };

  const options = {
    0: array.map((item, index) => ({ [index]: item })),
    1: array.map((item) => ({ item: item })),
    2: format2IndexObj(array),
    3: array.map((item) => ({ [item[0]]: item[1] })),
  };
  return options[type];
};

module.exports = {
  transformList,
  includesAll,
  objToArray,
  arrayToObject,
};
