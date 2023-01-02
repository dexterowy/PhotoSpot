export function sleep(duration: number, result: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, duration);
  });
}
