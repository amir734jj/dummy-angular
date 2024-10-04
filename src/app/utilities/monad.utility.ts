export const retry = (f: () => Promise<void>) => async (count: number) => {
  let flag = false;
  while (!flag && count > 0) {
    try {
      count--;
      await f();
      flag = true;
    } catch (e) {
      if (count === 0) {
        throw e;
      }
    }
  }
};
