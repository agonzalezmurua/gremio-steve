import React from 'react';
import { useAsync } from 'react-use';
import { GlobalStyles } from 'twin.macro';
import { IntlProvider } from 'react-intl';
import { HashRouter } from 'react-router-dom';

import useLocalePreference from '@/hooks/useLocalePreference';
import AppGlobalStyles from '@/App.styles';

function loadMessages(locale: string) {
  switch (locale) {
    case 'en':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return import('../lang/compiled/en.json');
    default:
      return Promise.resolve(undefined);
  }
}

const Document: React.FC = (props) => {
  const [locale] = useLocalePreference('en');
  const { value: messages, loading } = useAsync(async () =>
    loadMessages(locale)
  );

  return (
    <>
      <GlobalStyles />
      <AppGlobalStyles />
      {loading === true ? null : (
        <IntlProvider
          locale={locale}
          key={locale}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          messages={messages}
          defaultLocale="en"
        >
          <HashRouter>{props.children}</HashRouter>
        </IntlProvider>
      )}
    </>
  );
};

export default Document;