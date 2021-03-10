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
import { FormattedMessage } from 'react-intl';
import Button from '_/components/atoms/button';

const Callback: React.FC = () => {
  const { actions } = useContext(AppContext);
  const query = useQuery();
  const history = useHistory();

  const code = query.get('code'); // used for requesting acess token
  const serializedState = query.get('state'); // serialize base64 state value, received from callback

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

  const [authentication, authenticate] = useAsyncFn(async () => {
    if (state === null) {
      history.push(links.pages.error_400(), {
        name: 'Invalid request',
        message: 'Oops?',
      });
      return;
    }
    return Api.Client.operations.authenticateUser({
      body: { authentication: { code: code } },
    });
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
  }, []);

  useEffect(() => {
    const { loading, error, value } = authentication;
    if (loading) {
      return;
    }

    if (error !== undefined) {
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
    <main tw="h-full flex flex-col items-center justify-center">
      <section tw="p-8 space-y-4 border border-gray-700 rounded dark:(bg-gray-800)">
        <h1>
          <FormattedMessage
            id="pages.auth.osu.title"
            description="Authentication page header for confirmation"
            defaultMessage="Authentication confirmation"
          />
        </h1>
        <section tw="space-y-2">
          <p>
            <FormattedMessage
              id="pages.auth.osu.description"
              description="Description of data to use"
              defaultMessage="We will use the following information from osu!"
            />
          </p>

          <ul tw="list-disc list-inside">
            <li>
              <FormattedMessage
                id="pages.auth.osu.list.osu_id"
                description="List item, indicates that we will use your osu id"
                defaultMessage="Unique identifier number (id)"
              />
            </li>
            <li>
              <FormattedMessage
                id="pages.auth.osu.list.username"
                description="List item, indicates that we will use your osu username"
                defaultMessage="Username"
              />
            </li>
            <li>
              <FormattedMessage
                id="pages.auth.osu.list.avatar"
                description="List item, indicates that we will use your osu avatar image"
                defaultMessage="Avatar"
              />
            </li>
          </ul>
        </section>
        <Button
          fullWidth
          color="blue"
          disabled={state === null}
          onClick={authenticate}
          loading={authentication.loading}
        >
          <FormattedMessage
            id="pages.auth.osu.button"
            description="Button indicating that the user authorizes the usage of their data"
            defaultMessage="Accept"
          />
        </Button>
      </section>
    </main>
  );
};

export default Callback;
