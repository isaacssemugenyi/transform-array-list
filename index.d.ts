type IObjectToArray = boolean | string | number;
type IAllTypesArray = boolean[] | string[] | number[];
type IObjectToArrayType = 0 | 1 | 2 | 3;
type IArrToCheckWith = IAllTypesArray | IObjectToArray[];
type IObjToArrayReturn = IAllTypesArray | IObjectToArray[] | IAllTypesArray[];

interface OIObject {
  [key: string]: IObjectToArray;
}

type IArrayToObjectReturn =
  | OIObject[]
  | { [key: string]: OIObject }[]
  | { [key: string]: IObjToArrayReturn }[];

/**
 * @method transformList
 * @argument {Array, Array, string, string}
 * @description transformList([{id: 1, name: 'Isaac', age: 20}], ['age'], 'id', 'ageList')
 * @returns {Array}
 * @example [{id: 1, name: 'Isaac', ageList: [{age: 20}]}]
 */
export declare function transformList(
  itemList: IArrayToObjectReturn,
  fieldsArray: string[],
  identifier: string,
  lookupArray?: string
): IArrayToObjectReturn;

/**
 * @method includesAll
 * @argument {Array, Array}
 * @description includesAll(['football', 'baseball'], ['baseball', 'netball'])
 * @returns {boolean}
 * @example false
 */
export declare function includesAll(
  arrToCheckWith: IArrToCheckWith,
  arrToCompare: IArrToCheckWith
): boolean;

/**
 * @method objToArray
 * @argument {Object, number}
 * @description objToArray({'sport', 'baseball'}, 2)
 * @returns {Array}
 * @example ["sport", "baseball"]
 */
export declare function objToArray(
  obj: OIObject,
  type?: IObjectToArrayType
): IObjToArrayReturn;

/**
 * @method arrayToObject
 * @argument {Array, number}
 * @description arrayToObject(['address',{ default: 'Kampala', home: 'Mpigi', work: 'Wakiso' },'bio',{ firstName: 'Isaac', lastName: 'Johns' },],2)
 * @returns {Array}
 * @example [{ address: { default: 'Kampala', home: 'Mpigi', work: 'Wakiso' } },{ bio: { firstName: 'Isaac', lastName: 'Johns' } },]
 */
export declare function arrayToObject(
  array: IObjToArrayReturn,
  type?: IObjectToArrayType
): IArrayToObjectReturn;
