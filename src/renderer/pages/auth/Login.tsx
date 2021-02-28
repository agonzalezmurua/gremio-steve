import 'twin.macro';
import React, { useCallback, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Main } from 'common/ipc.events';
import AppContext from '@/contexts/app';
import { isBrowser, isElectron } from '@/constants/platform';
import AuthenticationStorage from '@/services/authentication.storage';
import links from '@/services/links';
import useQuery from '@/hooks/useQuery';

import WebLoginTemplate from '@/components/templates/web-login';
import AppLoginTemplate from '@/components/templates/app-login';

const LoginPage: React.FC<
  RouteComponentProps<
    unknown,
    unknown,
    { referer?: string; action: 'none' | 'logoff' }
  >
> = (props) => {
  const query = useQuery();
  const { isLoggedIn, actions } = useContext(AppContext);
  const referer = query.get('referer') || 'browser';

  // If redirected from any other page, logs out the user
  // TODO: add this to another page, this is just a placeholder
  useEffect(() => {
    AuthenticationStorage.removeToken();
    if (props.location.state?.action === 'logoff') {
      actions.logout();
    }
  }, [props.location.state?.action]);

  const handleWebLogin = useCallback(() => {
    const url = new URL(CONFIG.renderer.api.request_url); // Redirect url to navigate to
    const state = AuthenticationStorage.writeState();

    // Send a bas64 stringified value of the state that persists
    // during the oauth process and is used during the callback handle
    url.searchParams.append('state', btoa(JSON.stringify(state)));

    document.location.href = url.toString();
  }, []);

  // Since the app cannot log in by itself, we use this template
  if (isElectron) {
    return (
      <AppLoginTemplate
        onLogin={() => window.electron.ipcRenderer.send(Main.Events.open_auth)}
        loginLink={links.app.open_web.login()}
      />
    );
  } else {
    return (
      <WebLoginTemplate
        onLogin={handleWebLogin}
        isUserLoggedIn={isLoggedIn}
        referer={referer}
      />
    );
  }
};

export default LoginPage;
