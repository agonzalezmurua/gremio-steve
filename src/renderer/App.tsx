import 'twin.macro';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import AppContext from '@/contexts/app';

import * as IpcEvents from 'common/ipc.events';
import { Definitions } from '@/services/api';
import useAppHotkeys from '@/hooks/useAppHotkeys';
import useAppEvents from '@/hooks/useAppEvents';
import useIpcRendererEvent from '@/hooks/useIpcRendererEvent';
import GenericMessages from '@/constants/messages/generic';
import { isElectron } from '@/constants/platform';

// Regular import pages
import IndexPage from '@/pages/Index';
// import NotFoundPage from '@/pages/NotFound';
// import NewJourneyPage from '@/pages/journeys/New';
// import ActivityPage from '@/pages/user/Activity';
import LoginPage from '@/pages/auth/Login';
import CallbackPage from '@/pages/auth/osu/Callback';

// Dynamic import pages
const UserProfilePage = React.lazy(() => import('@/pages/user/Profile'));
const JourneyPage = React.lazy(() => import('@/pages/journeys/Id'));
const QueuePage = React.lazy(() => import('@/pages/user/Queue'));

import ErrorBoundary from '@/components/atoms/error-boundary';
import Navigation from '@/components/organisms/navigation';
import TitleBar from '@/components/organisms/title-bar';
import history from './services/history';
import links from './services/links';

const App: React.FC = () => {
  const context = useContext(AppContext);
  useAppHotkeys();
  useAppEvents();

  useIpcRendererEvent(
    IpcEvents.Renderer.Events.authenticate,
    (event, payload: IpcEvents.Renderer.Payloads.Authentication) => {
      history.push(
        links.pages.auth_osu_callback({
          code: payload.code,
        })
      );
    }
  );

  useIpcRendererEvent(
    IpcEvents.Renderer.Events.navigate,
    (event, payload: IpcEvents.Renderer.Payloads.Navigate) => {
      console.log('received navigate event', payload);
      history.push(payload.route);
    }
  );

  return (
    <section tw="h-full flex flex-col">
      <TitleBar />
      <ErrorBoundary>
        <section tw="flex-grow" aria-live="polite">
          <Switch>
            {isElectron === true && context.isLoggedIn === false && (
              <>
                <Route component={LoginPage} />
                <Route
                  exact
                  path="/auth/osu/callback"
                  component={CallbackPage}
                />
              </>
            )}
            <Suspense
              fallback={
                <FormattedMessage {...GenericMessages['generic.loading']} />
              }
            >
              <Navigation sidebar>
                <Route exact path="/" component={IndexPage} />
                <Route
                  exact
                  path="/auth/osu/callback"
                  component={CallbackPage}
                />
                <Route exact path="/login" component={LoginPage} />
                {/* <Route path="/journeys/new" exact component={NewJourneyPage} /> */}
                <Route path="/journeys/:id" component={JourneyPage} />
                <Route path="/user/:id/profile" component={UserProfilePage} />
                <Route path="/user/:id/queue" component={QueuePage} />
                {/* <Route path="/user/:id/activity" component={ActivityPage} /> */}
                {/* <Route path={['*', '/not-found']} component={NotFoundPage} /> */}
              </Navigation>
            </Suspense>
          </Switch>
        </section>
      </ErrorBoundary>
    </section>
  );
};

export default App;
