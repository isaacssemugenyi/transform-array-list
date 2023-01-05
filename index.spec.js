const {
  transformList,
  includesAll,
  objToArray,
  arrayToObject,
} = require('./index');

describe('transformList', () => {
  test('First Argument be an Array', () => {
    expect(() => transformList()).toThrow('First argument should be an array');
  });

  test('First Array not empty', () => {
    expect(() => transformList([])).toThrow('First array can not be empty');
  });

  test('First Array with data', () => {
    expect(() => transformList([{ id: 4, name: 'Isaac', age: '25' }])).toThrow(
      'Second argument should be an array'
    );
  });

  test('Second Argument be an Array', () => {
    expect(() =>
      transformList([{ id: 4, name: 'Isaac', age: '25' }], 'Testing')
    ).toThrow('Second argument should be an array');
  });

  test('Second Array not Empty', () => {
    expect(() =>
      transformList([{ id: 4, name: 'Isaac', age: '25' }], [])
    ).toThrow('Second array can not be empty');
  });

  test('identifier to be of type number or string', () => {
    expect(() =>
      transformList([{ id: 4, name: 'Isaac', age: '25' }], ['name'])
    ).toThrow('Identifier should be a number or a string');
  });

  test('returns formatted data', () => {
    const result = transformList(
      [{ id: 4, name: 'Isaac', age: '25' }],
      ['name'],
      'id'
    );
    expect(result).toEqual([{ age: '25', id: 4, lookup: [{ name: 'Isaac' }] }]);
  });

  test('returns formatted data', () => {
    const result = transformList(
      [{ id: 4, name: 'Isaac', age: '25' }],
      ['name'],
      'id',
      'output'
    );
    expect(result).toEqual([{ age: '25', id: 4, output: [{ name: 'Isaac' }] }]);
  });
});

describe('includesAll', () => {
  test('Array supported', () => {
    expect(() => includesAll()).toThrow('Only arrays are supported');
  });

  test('Empty array', () => {
    expect(() => includesAll([], [])).toThrow('Empty arrays are not supported');
  });

  test('object not supported', () => {
    expect(() => includesAll([[]], [[]])).toThrow(
      'Only arrays of strings, integers or boolean are supported'
    );
    expect(() => includesAll([{}], [{}])).toThrow(
      'Only arrays of strings, integers or boolean are supported'
    );
    expect(() => includesAll([[]], [{}])).toThrow(
      'Only arrays of strings, integers or boolean are supported'
    );
    expect(() => includesAll([{}], [[]])).toThrow(
      'Only arrays of strings, integers or boolean are supported'
    );
  });

  test('returns true', () => {
    expect(includesAll([true, false, false, true], [false])).toBe(true);
    expect(includesAll([false, true], [true, false, true])).toBe(true);
    expect(includesAll(['isaac', 'tom', 'john'], ['tom'])).toBe(true);
    expect(includesAll(['isaac', 2, 'john', 10], ['isaac', 10, 'john'])).toBe(
      true
    );
    expect(includesAll([1, 2, 3, 10], [2, 10])).toBe(true);
    expect(includesAll([1, 2, false, 10, true], [2, 10, false])).toBe(true);
  });

  test('returns false', () => {
    expect(includesAll([false], [false, true])).toBe(false);
    expect(includesAll([2, 4, 6, 8], [5, 2])).toBe(false);
    expect(includesAll(['tom', 'isaac'], ['isaac', 'tom', 'john'])).toBe(false);
    expect(
      includesAll(['tom', 4, 6, 'isaac'], ['isaac', 'tom', 'john', 6])
    ).toBe(false);
  });
});

describe('objToArray', () => {
  test('Expect object as an argument', () => {
    expect(() => objToArray(4)).toThrow('An object is expected');
    expect(() => objToArray()).toThrow('An object is expected');
    expect(() => objToArray([])).toThrow('An object is expected');
  });

  test('An Empty object as an argument', () => {
    expect(() => objToArray({})).toThrow('Object can not be empty');
  });

  test('Type to be a number', () => {
    expect(() => objToArray({ id: 3 }, '4')).toThrow(
      'Type can only be a number either 0, 1, 2, 3'
    );
  });

  test('Type either 0, 1, 2, 3', () => {
    expect(() => objToArray({ id: 3 }, -2)).toThrow(
      'Type can only be either 0, 1, 2, 3'
    );
  });

  test('Type either 0, 1, 2, 3', () => {
    expect(() => objToArray({ id: 3 }, 4)).toThrow(
      'Type can only be either 0, 1, 2, 3'
    );
  });

  test('returns an array with object values', () => {
    const result = objToArray({
      id: 4,
      name: 'Isaac',
      age: 25,
    });
    expect(result).toEqual([4, 'Isaac', 25]);
  });

  test('returns an array with object values', () => {
    const result = objToArray(
      {
        id: 4,
        name: 'Isaac',
        age: 25,
      },
      0
    );
    expect(result).toEqual([4, 'Isaac', 25]);
  });

  test('returns an array with object keys', () => {
    const result = objToArray(
      {
        id: 4,
        name: 'Isaac',
        age: 25,
      },
      1
    );
    expect(result).toEqual(['id', 'name', 'age']);
  });

  test('returns an array with object entries', () => {
    const result = objToArray(
      {
        id: 4,
        name: 'Isaac',
        age: 25,
      },
      2
    );
    expect(result).toEqual([
      ['id', 4],
      ['name', 'Isaac'],
      ['age', 25],
    ]);
  });

  test('returns an array with object flat keys and values', () => {
    const result = objToArray(
      {
        id: 4,
        name: 'Isaac',
        age: 25,
      },
      3
    );
    expect(result).toEqual(['id', 4, 'name', 'Isaac', 'age', 25]);
  });
});

describe('arrayToObject', () => {
  test('throw an error array expected', () => {
    expect(() => arrayToObject()).toThrow(
      'An array is expected as a first argument'
    );
    expect(() => arrayToObject('testing')).toThrow(
      'An array is expected as a first argument'
    );
    expect(() => arrayToObject({})).toThrow(
      'An array is expected as a first argument'
    );
  });

  test('throw an error of empty array', () => {
    expect(() => arrayToObject([])).toThrow('An array should not be empty');
  });

  test('empty nested array or more than 2 elements', () => {
    expect(() => arrayToObject([[]], 3)).toThrow(
      'With type 3, elements of array should each be length 2'
    );
    expect(() => arrayToObject([[1, 2, 3]], 3)).toThrow(
      'With type 3, elements of array should each be length 2'
    );
  });

  test('throw an error type be a number', () => {
    expect(() => arrayToObject([1, 2], 'me')).toThrow(
      'Type can only be a number either 0, 1, 2, 3'
    );

    expect(() => arrayToObject([1, 2], 4)).toThrow(
      'Type can only be either 0, 1, 2, 3'
    );
  });

  test('returns an array of object with indices as keys', () => {
    expect(arrayToObject([1, 2, 3])).toEqual([{ 0: 1 }, { 1: 2 }, { 2: 3 }]);
    expect(arrayToObject(['home', 'work'])).toEqual([
      { 0: 'home' },
      { 1: 'work' },
    ]);

    expect(arrayToObject([1, false, 'home'])).toEqual([
      { 0: 1 },
      { 1: false },
      { 2: 'home' },
    ]);

    expect(arrayToObject([{ name: 'Isaac' }, { name: 'annet' }])).toEqual([
      { 0: { name: 'Isaac' } },
      { 1: { name: 'annet' } },
    ]);

    expect(
      arrayToObject(
        [
          ['Male', 'Isaac'],
          ['Female', 'annet'],
        ],
        0
      )
    ).toEqual([{ 0: ['Male', 'Isaac'] }, { 1: ['Female', 'annet'] }]);
  });

  test('returns an array of object with item as keys', () => {
    expect(arrayToObject([1, 2, 3], 1)).toEqual([
      { item: 1 },
      { item: 2 },
      { item: 3 },
    ]);

    expect(arrayToObject(['one', 'two', 'three'], 1)).toEqual([
      { item: 'one' },
      { item: 'two' },
      { item: 'three' },
    ]);

    expect(
      arrayToObject(
        [{ name: 'Isaac' }, { name: 'annet' }, { name: 'phillip' }],
        1
      )
    ).toEqual([
      { item: { name: 'Isaac' } },
      { item: { name: 'annet' } },
      { item: { name: 'phillip' } },
    ]);
  });

  test('returns an array of object with first element as a key and next element as an object', () => {
    expect(arrayToObject([5, 2, 7, 4], 2)).toEqual([{ 5: 2 }, { 7: 4 }]);
    expect(
      arrayToObject(
        [
          'address',
          { default: 'Kampala', home: 'Mpigi', work: 'Wakiso' },
          'bio',
          { firstName: 'Isaac', lastName: 'Johns' },
        ],
        2
      )
    ).toEqual([
      { address: { default: 'Kampala', home: 'Mpigi', work: 'Wakiso' } },
      { bio: { firstName: 'Isaac', lastName: 'Johns' } },
    ]);
  });

  test('returns an array of object with first element in the nested array as key and second element as the value', () => {
    expect(
      arrayToObject(
        [
          [5, 2],
          [7, 4],
        ],
        3
      )
    ).toEqual([{ 5: 2 }, { 7: 4 }]);
    expect(
      arrayToObject(
        [
          [5, { name: 'isaac' }],
          [7, { name: 'annet' }],
        ],
        3
      )
    ).toEqual([{ 5: { name: 'isaac' } }, { 7: { name: 'annet' } }]);
  });
});
