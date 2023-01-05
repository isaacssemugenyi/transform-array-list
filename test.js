const doubleTransformList = (
  itemList, // list to transform
  firstFieldsArray, // fields to lookout from the array list
  secondFieldsArray, //[['name', 'age'], ['address', 'village']]
  identifier, // identifier like a list id
  firstLookupArray = 'firstLookup', //array name for the sub list
  secondLookupArray = 'secondLookup'
) => {
  let hashTable = {};
  let result = [];
  if (!Array.isArray(itemList)) return 'First argument should be an array';
  // check if objects in itemList is an object
  if (itemList.length <= 0) return 'First array can not be empty';
  if (!Array.isArray(firstFieldsArray))
    return 'Second argument should be an array';
  // check if elements in fieldsArray are strings
  if (firstFieldsArray.length <= 0) return 'Second array can not be empty';
  if (!Array.isArray(secondFieldsArray))
    return 'Third argument should be an array';
  // check if elements in fieldsArray are strings
  if (secondFieldsArray.length <= 0) return 'Third array can not be empty';
  if (
    typeof itemList[0][identifier] !== 'number' &&
    typeof itemList[0][identifier] !== 'string'
  )
    return 'Identifier should be a number or a string';

  for (let item of itemList) {
    // single item in the itemList
    let firstOptions = {}; // options from the fieldsArray as checked against the fields in the itemList
    let secondOptions = {};
    for (let field of firstFieldsArray) {
      firstOptions = { ...firstOptions, [field]: item[field] };
    }

    for (let field of secondFieldsArray) {
      secondOptions = { ...secondOptions, [field]: item[field] };
    }

    if (item[identifier] === hashTable[item[identifier]]) {
      // checking identifier field from item with fields in the hasHTable
      const index = result.findIndex(
        (currentItem) => currentItem[identifier] == item[identifier]
      );
      result[index][firstLookupArray].push(firstOptions); // push the options object into the lookupArray list
      result[index][secondLookupArray].push(secondOptions);
    } else {
      item = {
        // set an item to equal to all item fields and options objects into the new array
        ...item,
        [firstLookupArray]: new Array(firstOptions),
        [secondLookupArray]: new Array(secondOptions),
      };
      for (let value of firstFieldsArray) {
        delete item[value];
      }

      for (let value of secondFieldsArray) {
        delete item[value];
      }
      hashTable = { ...hashTable, [item[identifier]]: item[identifier] }; // spread the hashTable existing fields and add a new identifier for the new field
      result.push(item); // push the new item into the result
    }
  }

  return result; // return the results fomulated
};

// const multipleTransformList = (
//   itemList, // list to transform
//   fieldsArray, //[['name', 'age'], ['address', 'village']]
//   identifier, // identifier like a list id
//   lookupArray // ['listone', 'listtwo']
// ) => {
//   let hashTable = {};
//   let result = [];
//   if (!Array.isArray(itemList)) {
//     throw new Error('First argument should be an array');
//   }
//   // check if objects in itemList is an object
//   if (itemList.length <= 0) {
//     throw new Error('First array can not be empty');
//   }
//   if (!Array.isArray(fieldsArray)) {
//     throw new Error('Second argument should be an array');
//   }
//   // check if elements in fieldsArray are strings
//   if (fieldsArray.length <= 0) {
//     throw new Error('Second array can not be empty');
//   }

//   if (!Array.isArray(itemList[0])) {
//     throw new Error('Elements in fieldsArray should be arrays');
//   }

//   if (
//     typeof itemList[0][identifier] !== 'number' &&
//     typeof itemList[0][identifier] !== 'string'
//   ) {
//     throw new Error('Identifier should be a number or a string');
//   }

//   if (!Array.isArray(lookupArray)) {
//     throw new Error('Forth argument should be an array');
//   }

//   if (typeof lookupArray[0] !== 'string') {
//     throw new Error('Elements within the lookup array should be strings');
//   }

//   for (let item of itemList) {
//     let options = {};
//     for (let arrayElm of fieldsArray) {
//       for (let field of arrayElm) {
//         options = { ...options, [field]: item[field] };
//       }
//     }

//     if (item[identifier] === hashTable[item[identifier]]) {
//       // checking identifier field from item with fields in the hasHTable
//       const index = result.findIndex(
//         (currentItem) => currentItem[identifier] == item[identifier]
//       );
//       result[index][firstLookupArray].push(firstOptions); // push the options object into the lookupArray list
//       result[index][secondLookupArray].push(secondOptions);
//     } else {
//       item = {
//         // set an item to equal to all item fields and options objects into the new array
//         ...item,
//         [firstLookupArray]: new Array(firstOptions),
//         [secondLookupArray]: new Array(secondOptions),
//       };
//       for (let value of firstFieldsArray) {
//         delete item[value];
//       }

//       for (let value of secondFieldsArray) {
//         delete item[value];
//       }
//       hashTable = { ...hashTable, [item[identifier]]: item[identifier] }; // spread the hashTable existing fields and add a new identifier for the new field
//       result.push(item); // push the new item into the result
//     }
//   }

//   return result; // return the results fomulated
// };

const result = doubleTransformList(
  testList,
  ['name', 'address'],
  ['age'],
  'id',
  'details',
  'ages'
);
