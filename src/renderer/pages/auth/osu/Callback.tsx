import 'twin.macro';
import React, { useContext, useEffect, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import _ from 'lodash';

import useQuery from '@/hooks/useQuery';
import links from '@/services/links';
import Api from '@/services/api';
import { OauthState } from '@/typings/gremio-steve';
import AppContext from '@/App.context';

const Callback: React.FC = () => {
  const { actions } = useContext(AppContext);
  const query = useQuery();
  const history = useHistory();

  const code = query.get('code'); // used for requesting acess token
  const serializedStateFromQuery = query.get('state'); // state value from callback

  const [authenticationState, fetchAuthentication] = useAsyncFn(async () => {
    const response = await Api.Operations.authenticateUser({
      body: { authentication: { code: code } },
    });
    // TODO: implement refresh token
    // TODO: implement original destionation URL navigation

    actions.login(response.data.access_token); // Update context so user is logged in
    history.push(links.pages.home()); // Navigate to main home

    return;
  }, []);

  const state = useMemo<OauthState | null>(() => {
    const stateFromStorage = JSON.parse(
      sessionStorage.getItem('oauthstate')
    ) as OauthState; // oauth state value, one use only
    sessionStorage.removeItem('oauthstate'); // Ensure that this value is deleted right away

    const stateFromQuery = JSON.parse(
      atob(serializedStateFromQuery)
    ) as OauthState; // oauth state from callback

    // Only return a valid state when they are strictly equal
    if (_.isEqual(stateFromStorage, stateFromQuery)) {
      return stateFromStorage;
    }

    return null;
  }, [serializedStateFromQuery]);

  // Handdle state validation and access
  useEffect(() => {
    if (state === null) {
      history.push(links.pages.error_400(), {
        name: 'Invalid request',
        message: 'Oops?',
      });
      return;
    }
    if (state.came_from === 'browser') {
      fetchAuthentication().catch((error) => {
        history.push(links.pages.error_400(), {
          name: error.name,
          message: error.message,
        });
      });
    }
    return () => sessionStorage.removeItem('oauthstate'); // Use oauthstate nonce
  }, [state]);

  if (authenticationState.error) {
    console.error(authenticationState.error);
    return <Redirect to={links.pages.error_500()} />;
  }

  return (
    <main tw="h-full flex items-center justify-center">
      <h1>Authenticating</h1>
      <a href={links.desktop.protocol.auth_callback(code)}>
        Click here to open app
      </a>
    </main>
  );
};

export default Callback;
