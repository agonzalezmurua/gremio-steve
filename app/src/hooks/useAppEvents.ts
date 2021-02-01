import { useEffectOnce } from 'react-use';

const useAppEvents = () => {
  useEffectOnce(() => {
    const anchorListener = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (!target) {
        return;
      }
      console;
      if (
        target.tagName.toLowerCase() === 'a' &&
        !target.href.match(/^(http|https)\:\/\/localhost/)
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
