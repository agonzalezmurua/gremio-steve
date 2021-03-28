import 'twin.macro';
import React, { useCallback, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Main } from 'common/ipc.events';
import AppContext from '_/contexts/app';
import { isBrowser, isElectron } from '_/constants/platform';
import AuthenticationStorage from '_/services/authentication.storage';
import links from '_/services/links';
import useQuery from '_/hooks/useQuery';

import WebLoginTemplate from '_/components/templates/web-login';
import AppLoginTemplate from '_/components/templates/app-login';

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

  const handleLogin = useCallback(() => {
    if (isElectron) {
      return window.electron.ipcRenderer.send(Main.Events.open_auth);
    }

    const url = new URL(CONFIG.renderer.api.request_url); // Redirect url to navigate to

    document.location.assign(url.toString());
  }, []);

  // Since the app cannot log in by itself, we use this template
  if (isElectron) {
    return (
      <AppLoginTemplate
        onLogin={handleLogin}
        loginLink={links.app.open_web.login()}
      />
    );
  } else {
    return (
      <WebLoginTemplate
        onLogin={handleLogin}
        isUserLoggedIn={isLoggedIn}
        referer={referer}
      />
    );
  }
};

export default LoginPage;
