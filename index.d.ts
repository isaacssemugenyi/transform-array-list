declare module 'transform-array-list' {
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

  export default function transformList(
    itemList: IArrayToObjectReturn,
    fieldsArray: string[],
    identifier: string,
    lookupArray: string
  ): IArrayToObjectReturn;

  export default function includesAll(
    arrToCheckWith: IArrToCheckWith,
    arrToCompare: IArrToCheckWith
  ): boolean;

  export default function objToArray(
    obj: OIObject,
    type: IObjectToArrayType
  ): IObjToArrayReturn;

  export default function arrayToObject(
    array: IObjToArrayReturn,
    type: IObjectToArrayType
  ): IArrayToObjectReturn;
}
