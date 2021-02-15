import { handleKey } from '_utils';
import { RefObject, useEffect, useRef } from 'react';
import { off, on } from './utils';

const useKeyDownHotkey = <E extends React.KeyboardEvent<HTMLElement>>(
  ref: RefObject<HTMLElement | null>,
  key: string,
  handler: (event: E) => void
) => {
  const savedHandler = useRef(handler);
  useEffect(() => {
    const handler = handleKey(key, (event: E) => {
      const { current: el } = ref;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      el && el.contains(event.target) && savedHandler.current(event);
    });

    on(document, 'keydown', handler);

    return () => {
      off(document, 'keydown', handler);
    };
  }, [key, ref]);
};

export default useKeyDownHotkey;
