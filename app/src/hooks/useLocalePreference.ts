import { useEffect, useRef, useState } from 'react';

const keyName = 'locale.preference';

export default function useLocalePreference(
  defaultPreference = 'en'
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const savedPreference = useRef<string>(
    localStorage.getItem('localePreference')
  );
  const [preference, setPreference] = useState(
    savedPreference.current || defaultPreference
  );

  useEffect(() => {
    localStorage.setItem(keyName, preference);
  }, [preference]);

  return [preference, setPreference];
}
