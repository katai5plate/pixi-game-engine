/* eslint-disable @typescript-eslint/no-explicit-any */
/** optional 値の代入用 */
export const optional = (value: any, defaultValue: any = void 0): any =>
  [null, void 0].includes(value) ? defaultValue : value;
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/** 未使用関数のキープ用 */
export const keeper = (...values: any[]): void => void 0;
/* eslint-enable @typescript-eslint/explicit-function-return-type */
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
