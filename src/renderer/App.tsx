import 'twin.macro';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import AppContext from '_/contexts/app';

import * as IpcEvents from 'common/ipc.events';
import { Definitions } from '_/services/api';
import useAppHotkeys from '_/hooks/useAppHotkeys';
import useAppEvents from '_/hooks/useAppEvents';
import useIpcRendererEvent from '_/hooks/useIpcRendererEvent';
import GenericMessages from '_/constants/messages/generic';
import { isElectron } from '_/constants/platform';

// Regular import pages
import IndexPage from '_/pages/Index';
import NotFoundPage from '_/pages/NotFound';
// import NewJourneyPage from '_/pages/journeys/New';
// import ActivityPage from '_/pages/user/Activity';
import LoginPage from '_/pages/auth/Login';
import CallbackPage from '_/pages/auth/osu/Callback';

// Dynamic import pages
const UserProfilePage = React.lazy(() => import('_/pages/user/Profile'));
const JourneyPage = React.lazy(() => import('_/pages/journeys/Id'));
const QueuePage = React.lazy(() => import('_/pages/user/Queue'));

import ErrorBoundary from '_/components/atoms/error-boundary';
import SideBar from '_/components/organisms/side-bar';
import TitleBar from '_/components/organisms/title-bar';
import history from './services/history';
import links from './services/links';
import FullscreenLoader from './components/atoms/fullscreen-loader';

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
    <section tw="max-h-full min-h-full flex flex-col">
      <TitleBar />
      <ErrorBoundary>
        <Switch>
          {isElectron === true && context.isLoggedIn === false && (
            <>
              <Route path="/" component={LoginPage} />
              <Route exact path="/auth/osu/callback" component={CallbackPage} />
            </>
          )}
          <Suspense fallback={<FullscreenLoader />}>
            <SideBar>
              <Switch>
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
                <Route path={['*', '/not-found']} component={NotFoundPage} />
              </Switch>
            </SideBar>
          </Suspense>
        </Switch>
      </ErrorBoundary>
    </section>
  );
};

export default App;
