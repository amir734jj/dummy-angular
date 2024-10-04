import _ from 'lodash';

export const roughSizeOfObject = (o: any) => {
  const objectList = [];
  const stack = [o];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    } else if (typeof value === 'number') {
      bytes += 8;
    } else if
    (
      typeof value === 'object'
      && objectList.indexOf(value) === -1
    ) {
      objectList.push(value);

      _.forEach(value, x => stack.push(x));
    }
  }
  return bytes;
};
