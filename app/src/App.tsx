/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { IntlProvider } from 'react-intl';
import { useAsync } from 'react-use';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from 'twin.macro';

import AppGlobalStyles from '@globals/AppGlobalStyle';
import NavBar from '@components/organisms/NavBar';

import Indexpage from '@pages/Index';
import NotFoundPage from '@pages/NotFound';
import JourneyPage from '@pages/journeys/Id';
import NewJourneyPage from '@pages/journeys/New';
import QueuePage from '@pages/user/Queue';

import useLocalePreference from '@hooks/useLocalePreference';
import ActivityPage from '@pages/Activity';

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
          // @ts-ignore
          messages={messages}
          defaultLocale="en"
        >
          <HashRouter tw="h-screen">
            <NavBar>
              <Switch>
                <Route path="/" exact component={Indexpage} />
                <Route path="/journeys/new" exact component={NewJourneyPage} />
                <Route path="/journeys/:id" component={JourneyPage} />
                <Route path="/user/:id/queue" component={QueuePage} />
                <Route path="/user/:id/activity" components={ActivityPage} />
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
