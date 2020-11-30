import React from 'react';
import { IntlProvider } from 'react-intl';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from 'twin.macro';

import AppGlobalStyles from '@globals/AppGlobalStyle';
import NavBar from '@components/organisms/NavBar';

import Indexpage from '@pages/index';
import JourneyPage from '@pages/journeys/id';
import NotFoundPage from '@pages/NotFound';
import NewJourneyPage from '@pages/journeys/new';
import { useAsync } from 'react-use';
import useLocalePreference from '@hooks/useLocalePreference';
import FullScreenLoader from '@components/atoms/FullLoader';

function loadMessages(locale: string) {
  console.log(locale);
  switch (locale) {
    default:
      return import('../compiled-lang/en.json');
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
        <IntlProvider locale={locale} messages={messages} defaultLocale="en">
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
