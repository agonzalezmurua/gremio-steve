/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from '@components/organisms/NavBar';

import Indexpage from '@pages/Index';
import NotFoundPage from '@pages/NotFound';
import JourneyPage from '@pages/journeys/Id';
import NewJourneyPage from '@pages/journeys/New';
import QueuePage from '@pages/user/Queue';

import ActivityPage from '@pages/Activity';
import { useAppHotkeys } from '@hooks/useAppHotkeys';

type Props = {
  loading: boolean;
};

const App: React.FC<Props> = ({ loading }) => {
  useAppHotkeys();

  return (
    <section tw="h-screen">
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
    </section>
  );
};

export default App;
