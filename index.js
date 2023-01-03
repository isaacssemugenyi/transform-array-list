/**
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
  if (!Array.isArray(itemList)) return 'First argument should be an array';
  // check if objects in itemList is an object
  if (itemList.length <= 0) return 'First array can not be empty';
  if (!Array.isArray(fieldsArray)) return 'Second argument should be an array';
  // check if elements in fieldsArray are strings
  if (fieldsArray.length <= 0) return 'Second array can not be empty';
  if (
    typeof itemList[0][identifier] !== 'number' &&
    typeof itemList[0][identifier] !== 'string'
  )
    return 'Identifier should be a number or a string';

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

module.exports = {
  transformList,
};
