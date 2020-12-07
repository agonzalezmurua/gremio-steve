import React from 'react';
import { useAsync } from 'react-use';
import { GlobalStyles } from 'twin.macro';
import { IntlProvider } from 'react-intl';
import { HashRouter } from 'react-router-dom';

import useLocalePreference from '@hooks/useLocalePreference';
import AppGlobalStyles from '@globals/AppGlobalStyle';

import App from './App';

function loadMessages(locale: string) {
  switch (locale) {
    case 'en':
      return import('../compiled-lang/en.json');
    default:
      return Promise.resolve(undefined);
  }
}

const Document: React.FC = () => {
  const [locale] = useLocalePreference('en');
  const { value: messages, loading } = useAsync(async () =>
    loadMessages(locale)
  );

  return (
    <>
      <GlobalStyles />
      <AppGlobalStyles />
      {loading || (
        <IntlProvider
          locale={locale}
          key={locale}
          // @ts-ignore
          messages={messages}
          defaultLocale="en"
        >
          <HashRouter>
            <App loading={loading} />
          </HashRouter>
        </IntlProvider>
      )}
    </>
  );
};

export default Document;
