/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '@/components/organisms/navigation';

import IndexPage from '@/pages/Index';
// import NotFoundPage from '@/pages/NotFound';
// import JourneyPage from '@/pages/journeys/Id';
// import NewJourneyPage from '@/pages/journeys/New';
// import QueuePage from '@/pages/user/Queue';
// import ActivityPage from '@/pages/user/Activity';
// import UserProfilePage from '@/pages/user/Profile';

import useAppHotkeys from '@/hooks/useAppHotkeys';
import useAppEvents from '@/hooks/useAppEvents';
import LoginPage from '@/pages/auth/Login';

const App: React.FC = () => {
  useAppHotkeys();
  useAppEvents();

  return (
    <section tw="h-screen">
      <Navigation>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/login" exact component={LoginPage} />
          {/* <Route path="/journeys/new" exact component={NewJourneyPage} />
          <Route path="/journeys/:id" component={JourneyPage} />
          <Route path="/user/:id/profile" component={UserProfilePage} />
          <Route path="/user/:id/queue" component={QueuePage} />
          <Route path="/user/:id/activity" component={ActivityPage} />
          <Route path={['*', '/not-found']} component={NotFoundPage} /> */}
        </Switch>
      </Navigation>
    </section>
  );
};

export default App;
