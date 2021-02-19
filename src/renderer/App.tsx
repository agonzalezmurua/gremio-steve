import 'twin.macro';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContext from '@/contexts/app';
import { Definitions } from '@/services/api';

import IndexPage from '@/pages/Index';
// import NotFoundPage from '@/pages/NotFound';
// import JourneyPage from '@/pages/journeys/Id';
// import NewJourneyPage from '@/pages/journeys/New';
// import QueuePage from '@/pages/user/Queue';
// import ActivityPage from '@/pages/user/Activity';
import LoginPage from '@/pages/auth/Login';
import CallbackPage from '@/pages/auth/osu/Callback';

// Dynamic import pages
const UserProfilePage = React.lazy(() => import('@/pages/user/Profile'));

import useAppHotkeys from '@/hooks/useAppHotkeys';
import useAppEvents from '@/hooks/useAppEvents';
import useIpcRendererEvent from '@/hooks/useIpcRendererEvent';

import Navigation from '@/components/organisms/navigation';
import TitleBar from '@/components/organisms/title-bar';

import * as IpcEvents from 'common/ipc.events';
import { FormattedMessage } from 'react-intl';
import GenericMessages from './constants/messages/generic';
import { isElectron } from './constants/platform';

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
      <section tw="flex-grow" aria-live="polite">
        <Switch>
          {isElectron === true && context.isLoggedIn === false && (
            <Route component={LoginPage} />
          )}
          <Suspense
            fallback={
              <FormattedMessage {...GenericMessages['generic.loading']} />
            }
          >
            <Navigation sidebar>
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/auth/osu/callback" component={CallbackPage} />
              <Route exact path="/login" component={LoginPage} />
              {/* <Route path="/journeys/new" exact component={NewJourneyPage} /> */}
              {/* <Route path="/journeys/:id" component={JourneyPage} /> */}
              <Route path="/user/:id/profile" component={UserProfilePage} />
              {/* <Route path="/user/:id/queue" component={QueuePage} /> */}
              {/* <Route path="/user/:id/activity" component={ActivityPage} /> */}
              {/* <Route path={['*', '/not-found']} component={NotFoundPage} /> */}
            </Navigation>
          </Suspense>
        </Switch>
      </section>
    </section>
  );
};

export default App;
