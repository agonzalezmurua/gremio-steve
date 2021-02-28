// TODO: implement original destionation URL navigation

import 'twin.macro';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import _ from 'lodash';

import useQuery from '@/hooks/useQuery';
import links from '@/services/links';
import Api from '@/services/api';
import { AuthenticationState } from '@/typings/gremio-steve';
import AppContext from '@/contexts/app';
import Storage from '@/services/authentication.storage';
import AuthenticationStorage from '@/services/authentication.storage';

const Callback: React.FC = () => {
  const { actions, isLoggedIn } = useContext(AppContext);
  const query = useQuery();
  const history = useHistory();

  const code = query.get('code'); // used for requesting acess token
  const serializedState = query.get('state'); // serialize base64 state value, received from callback

  const [authentication, fetchAuthentication] = useAsyncFn(async () => {
    return Api.Operations.authenticateUser({
      body: { authentication: { code: code } },
    });
  }, []);

  const state = useMemo<AuthenticationState | null>(() => {
    const stateFromStorage = Storage.readState();

    const stateFromQuery = JSON.parse(
      atob(serializedState) // Parse string from base64
    ) as AuthenticationState; // oauth state from callback

    // State is valid ONLY when both values are strictly equal
    if (_.isEqual(stateFromStorage, stateFromQuery)) {
      return stateFromStorage;
    }

    return null;
  }, []);

  // Handdle state validation and access
  useEffect(() => {
    if (state === null) {
      history.push(links.pages.error_400(), {
        name: 'Invalid request',
        message: 'Oops?',
      });
      return;
    }

    fetchAuthentication()
      .then((response) => {
        actions.login(response.data); // Update context so user is logged in
      })
      .catch((error) => {
        history.push(links.pages.error_400(), {
          name: error.name,
          message: error.message,
        });
      });
  }, [state]);

  if (authentication.error) {
    console.error(authentication.error);
    return <Redirect to={links.pages.error_500()} />;
  }

  if (isLoggedIn) {
    return <Redirect to={links.pages.home()} />;
  }

  return (
    <main tw="h-full flex items-center justify-center">
      <h1>Authenticating</h1>
    </main>
  );
};

export default Callback;
