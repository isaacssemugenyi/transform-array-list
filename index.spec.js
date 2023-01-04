const { transformList } = require('./index');

describe('Transform Array Function', () => {
  test('First Argument be an Array', () => {
    expect(transformList()).toBe('First argument should be an array');
  });

  test('First Array not empty', () => {
    expect(transformList([])).toBe('First array can not be empty');
  });

  test('First Array with data', () => {
    expect(transformList([{ id: 4, name: 'Isaac', age: '25' }])).toBe(
      'Second argument should be an array'
    );
  });

  test('Second Argument be an Array', () => {
    expect(
      transformList([{ id: 4, name: 'Isaac', age: '25' }], 'Testing')
    ).toBe('Second argument should be an array');
  });

  test('Second Array not Empty', () => {
    expect(transformList([{ id: 4, name: 'Isaac', age: '25' }], [])).toBe(
      'Second array can not be empty'
    );
  });

  test('identifier to be of type number or string', () => {
    expect(transformList([{ id: 4, name: 'Isaac', age: '25' }], ['name'])).toBe(
      'Identifier should be a number or a string'
    );
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
