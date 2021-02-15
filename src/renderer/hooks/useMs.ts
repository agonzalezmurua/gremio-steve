import MS from 'ms-i18n';
import { useCallback, useEffect, useRef } from 'react';

export default function useMs(locale?: string) {
  const instance = useRef(new MS(locale));
  const format = useCallback(
    (val, options): React.ReactText => instance.current.format(val, options),
    [locale]
  );

  useEffect(() => {
    instance.current = new MS(locale);
  }, [locale]);

  return format;
}
