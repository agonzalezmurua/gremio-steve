import 'twin.macro';
import React, { useCallback, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '@/contexts/app';
import AuthenticationStorage from '@/services/authentication.storage';
import { isBrowser, isElectron } from '@/constants/platform';
import { OauthState } from '@/typings/gremio-steve';
import links from '@/services/links';
import useQuery from '@/hooks/useQuery';

import WebLoginTemplate from '@/components/templates/web-login';
import AppLoginTemplate from '@/components/templates/app-login';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
  const query = useQuery();
  const { isLoggedIn } = useContext(AppContext);
  const cameFrom = query.get('came_from');

  /**
   * Continue the authenticaton flow on the app
   */
  const handleOpenAppFromWeb = useCallback(() => {
    if (!isLoggedIn) {
      return;
    }

    document.location.href = links.app.protocol.authenticate(
      AuthenticationStorage.get()
    );
  }, [isLoggedIn]);

  /**
   * Regular auth flow
   */
  const handleWebLogin = useCallback(() => {
    const url = new URL(CONFIG.renderer.api.request_url);
    const state: OauthState = {
      identifier: uuidv4(),
      came_from: isBrowser ? 'browser' : 'app',
    };

    sessionStorage.setItem('oauthstate', JSON.stringify(state));
    url.searchParams.append('state', btoa(JSON.stringify(state)));

    document.location.href = url.toString();
  }, []);

  /**
   * Opens the default browser at the login link
   */
  const handleAppLogin = useCallback(() => {
    window.electron.shell.openExternal(links.app.open_web.login());
  }, []);

  if (isBrowser) {
    return (
      <WebLoginTemplate
        onLogin={handleWebLogin}
        isUserLoggedIn={isLoggedIn}
        onOpenApp={handleOpenAppFromWeb}
        cameFrom={cameFrom}
      />
    );
  } else {
    return (
      <AppLoginTemplate
        onLogin={handleAppLogin}
        loginLink={links.app.open_web.login()}
      />
    );
  }
};

export default LoginPage;
