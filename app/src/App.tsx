import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from 'twin.macro';

import AppGlobalStyles from '@globals/AppGlobalStyle';
import NavBar from '@components/organisms/NavBar';

import Indexpage from '@pages/index';
import JourneyPage from '@pages/journeys/id';
import NotFoundPage from '@pages/NotFound';
import NewJourneyPage from '@pages/journeys/new';

const App: React.FunctionComponent = () => {
  return (
    <>
      <GlobalStyles />
      <AppGlobalStyles />
      <HashRouter tw="h-screen">
        <NavBar>
          <Switch>
            <Route path="/" exact component={Indexpage} />
            <Route path="/journeys/new" component={NewJourneyPage} />
            <Route path="/journeys/:id)" component={JourneyPage} />
            <Route path={['*', '/not-found']} component={NotFoundPage} />
          </Switch>
        </NavBar>
      </HashRouter>
    </>
  );
};

export default App;
