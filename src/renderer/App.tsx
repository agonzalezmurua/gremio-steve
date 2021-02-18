import 'twin.macro';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '@/components/organisms/navigation';

import IndexPage from '@/pages/Index';
// import NotFoundPage from '@/pages/NotFound';
// import JourneyPage from '@/pages/journeys/Id';
// import NewJourneyPage from '@/pages/journeys/New';
// import QueuePage from '@/pages/user/Queue';
// import ActivityPage from '@/pages/user/Activity';
import UserProfilePage from '@/pages/user/Profile';

import useAppHotkeys from '@/hooks/useAppHotkeys';
import useAppEvents from '@/hooks/useAppEvents';
import LoginPage from '@/pages/auth/Login';
import CallbackPage from '@/pages/auth/osu/Callback';
import useIpcRendererEvent from '@/hooks/useIpcRendererEvent';
import * as IpcEvents from 'common/ipc.events';
import AppContext from '@/contexts/app';
import { Definitions } from '@/services/api';
import { isBrowser, isElectron } from './constants/platform';
import TitleBar from './components/organisms/title-bar';

const App: React.FC = () => {
  const context = useContext(AppContext);
  useAppHotkeys();
  useAppEvents();

  useIpcRendererEvent(
    IpcEvents.Renderer.authenticate_user,
    (event, payload: Definitions['Authentication.Response']) => {
      context.actions.login(payload);
    }
  );

  return (
    <section tw="h-full flex flex-col">
      <TitleBar />
      <section tw="flex-grow">
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Navigation sidebar>
            <Route path="/" exact component={IndexPage} />
            <Route path="/auth/osu/callback" exact component={CallbackPage} />
            {/* <Route path="/journeys/new" exact component={NewJourneyPage} /> */}
            {/* <Route path="/journeys/:id" component={JourneyPage} /> */}
            <Route path="/user/:id/profile" component={UserProfilePage} />
            {/* <Route path="/user/:id/queue" component={QueuePage} /> */}
            {/* <Route path="/user/:id/activity" component={ActivityPage} /> */}
            {/* <Route path={['*', '/not-found']} component={NotFoundPage} /> */}
          </Navigation>
        </Switch>
      </section>
    </section>
  );
};

export default App;
