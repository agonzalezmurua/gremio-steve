import React, { useEffect, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAsyncFn } from 'react-use';

import useQuery from '@/hooks/useQuery';
import links from '@/services/links';
import Api from '@/services/api';

const Callback: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const code = query.get('code');
  const stateIdentifier = query.get('state');

  const state = useMemo(() => {
    const states = JSON.parse(
      atob(localStorage.getItem('oauthstate'))
    ) as Steve.StoredOauthState;
    localStorage.removeItem('oauthstate');
    return states[stateIdentifier];
  }, [stateIdentifier]);

  const [authenticationState, fetchAuthentication] = useAsyncFn(async () => {
    const response = Api.Operations.authenticateUser({
      body: { authentication: { code: code } },
    });

    // TODO: store access token

    history.push(links.pages.home());
    return;
  }, [state]);

  useEffect(() => {
    if (state) {
      fetchAuthentication();
    }
    return () => localStorage.removeItem('oauthstate'); // Use oauthstate nonce
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
