import React, { useContext, useEffect, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAsyncFn } from 'react-use';

import useQuery from '@/hooks/useQuery';
import links from '@/services/links';
import Api from '@/services/api';
import { StoredOauthState } from '@/typings/gremio-steve';
import AppContext from '@/App.context';
import { session } from 'electron';

const Callback: React.FC = () => {
  const { actions } = useContext(AppContext);
  const query = useQuery();
  const history = useHistory();

  const code = query.get('code');
  const stateIdentifier = query.get('state');

  const state = useMemo(() => {
    const states = JSON.parse(
      atob(sessionStorage.getItem('oauthstate'))
    ) as StoredOauthState;
    sessionStorage.removeItem('oauthstate'); // Use
    return states[stateIdentifier];
  }, [stateIdentifier]);

  const [authenticationState, fetchAuthentication] = useAsyncFn(async () => {
    const response = await Api.Operations.authenticateUser({
      body: { authentication: { code: code } },
    });

    actions.login(response.data.access_token);
    history.push(links.pages.home());
    return;
  }, [state]);

  useEffect(() => {
    if (state) {
      fetchAuthentication();
    }
    return () => sessionStorage.removeItem('oauthstate'); // Use oauthstate nonce
  }, [state]);

  if (!state) {
    return <Redirect to={links.pages.error_400()} />;
  }

  if (authenticationState.error) {
    return <Redirect to={links.pages.error_500()} />;
  }

  return <main>Authenticating</main>;
};

export default Callback;
