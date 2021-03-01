// TODO: implement original destionation URL navigation

import 'twin.macro';
import React, { useContext, useEffect, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import _ from 'lodash';

import useQuery from '_/hooks/useQuery';
import links from '_/services/links';
import Api from '_/services/api';
import { AuthenticationState } from '_/typings/gremio-steve';
import AppContext from '_/contexts/app';
import Storage from '_/services/authentication.storage';
import AuthenticationStorage from '_/services/authentication.storage';

const Callback: React.FC = () => {
  const { actions } = useContext(AppContext);
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
    fetchAuthentication();
  }, []);

  useEffect(() => {
    const { loading, error, value } = authentication;
    if (loading) {
      return;
    }

    if (error) {
      history.push(links.pages.error_400(), {
        name: error.name,
        message: error.message,
      });
      return;
    }

    if (value?.status === 200) {
      actions.login(value.data); // Update context so user is logged in
      history.push(links.pages.home());
    }
  }, [authentication]);

  return (
    <main tw="h-full flex items-center justify-center">
      <h1>Authenticating</h1>
    </main>
  );
};

export default Callback;
