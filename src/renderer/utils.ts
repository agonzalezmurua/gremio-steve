/**
 * Listen for key presses and execute a callback when they are pressed
 *
 * See [DOM level 3 Events spec.](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) for possible values
 * @param keys Keys to listen to
 * @param callback Function to execute when the keys are pressed
 * @returns Function with the embedded event
 */
export const handleKey = <E extends React.KeyboardEvent<HTMLElement>>(
  keys: string | string[],
  callback: (event: E) => void
) => (event: E) => {
  // If matches the specified key, execute callback
  function check(key: string) {
    if (event.key === key) {
      callback(event);
    }
  }

  if (typeof keys === 'string') {
    check(keys);
  } else {
    // Check if any key matches
    for (const key of keys) {
      check(key);
    }
  }
};
