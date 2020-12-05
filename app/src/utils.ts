export const handleKey = <E extends React.KeyboardEvent<HTMLElement>>(
  keys: string | string[],
  handler: (event: E) => void
) => (event: E) => {
  function check(key: string) {
    if (event.key === key) {
      handler(event);
    }
  }

  if (typeof keys === 'string') {
    check(keys);
  } else {
    for (const key of keys) {
      check(key);
    }
  }
};
