export const on = (
  obj: Document,
  ...args: Parameters<Document['addEventListener']>
) => obj.addEventListener(...args);

export const off = (
  obj: Document,
  ...args: Parameters<Document['addEventListener']>
) => obj.removeEventListener(...args);
