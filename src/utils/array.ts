export function ObjectKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj as any) as (keyof T)[];
}

export function chopArray<I>(arr: I[], shape: number[]) {
  const clone = arr.slice(0);
  return shape.map(num => clone.splice(0, num));
}


/**
 * Counts the number of items upto, but
 * not including the current column
 */
export function choppedArrayRunningCount(colNum: number, shape: number[]) {
  let count = 0;
  for (let i = 0; i < colNum; i++) {
    count += shape[i];
  }
  return count;
}