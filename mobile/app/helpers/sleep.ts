export const sleep = (time: number, value?: any) => {
  return new Promise(res => {
    setTimeout(() => {
      res(value);
    }, time);
  });
};
