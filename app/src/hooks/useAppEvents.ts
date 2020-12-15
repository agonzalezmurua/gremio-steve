import React from 'react';
import { useEffectOnce } from 'react-use';

const useAppEvents = () => {
  useEffectOnce(() => {
    const anchorListener = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (!target) {
        return;
      }
      if (
        target.tagName.toLowerCase() === 'a' &&
        target.href.match(/^(http|https)\:\/\//)
      ) {
        event.preventDefault();
        window.electron.shell.openExternal(target.href);
      }
    };

    document.addEventListener('click', anchorListener);

    return () => document.removeEventListener('click', anchorListener);
  });
};

export default useAppEvents;
