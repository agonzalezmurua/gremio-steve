import React from 'react';
import { IntlProvider } from 'react-intl';
import { useAsync } from 'react-use';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from 'twin.macro';

import AppGlobalStyles from '@globals/AppGlobalStyle';
import NavBar from '@components/organisms/NavBar';

import Indexpage from '@pages/index';
import JourneyPage from '@pages/journeys/id';
import NotFoundPage from '@pages/NotFound';
import NewJourneyPage from '@pages/journeys/new';
import useLocalePreference from '@hooks/useLocalePreference';

function loadMessages(locale: string) {
  switch (locale) {
    case 'en':
      return import('../compiled-lang/en.json');
    default:
      return Promise.resolve(undefined);
  }
}

const App: React.FC = () => {
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
          messages={messages}
          defaultLocale="en"
        >
          <HashRouter tw="h-screen">
            <NavBar>
              <Switch>
                <Route path="/" exact component={Indexpage} />
                <Route path="/journeys/new" exact component={NewJourneyPage} />
                <Route path="/journeys/:id" component={JourneyPage} />
                <Route path={['*', '/not-found']} component={NotFoundPage} />
              </Switch>
            </NavBar>
          </HashRouter>
        </IntlProvider>
      )}
    </>
  );
};

export default App;
