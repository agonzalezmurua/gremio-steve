import 'twin.macro';
import React, { useCallback, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppContext from '@/App.context';
import { ACCESS_TOKEN_KEY } from '@/App.context.user';
import { isBrowser } from '@/constants/platform';
import { OauthState } from '@/typings/gremio-steve';
import links from '@/services/links';
import useQuery from '@/hooks/useQuery';

import WebLoginTemplate from '@/components/templates/web-login';
import AppLoginTemplate from '@/components/templates/app-login';

const LoginPage = () => {
  const query = useQuery();
  const { isLoggedIn } = useContext(AppContext);
  const cameFrom = query.get('came_from');

  const handleOpenApp = useCallback(() => {
    document.location.href = links.desktop.protocol.auth_callback(
      localStorage.getItem(ACCESS_TOKEN_KEY)
    );
  }, [isLoggedIn]);

  const handleWebLogin = useCallback(() => {
    if (cameFrom === 'app') {
      return;
    }
    const url = new URL(CONFIG.renderer.api.request_url);

    const state: OauthState = {
      identifier: uuidv4(),
      came_from: isBrowser ? 'browser' : 'app',
    };

    sessionStorage.setItem('oauthstate', JSON.stringify(state));
    url.searchParams.append('state', btoa(JSON.stringify(state)));

    document.location.href = url.toString();
  }, []);

  if (isBrowser) {
    return (
      <WebLoginTemplate
        onLogin={handleWebLogin}
        isUserLoggedIn={isLoggedIn}
        onOpenApp={handleOpenApp}
        cameFrom={cameFrom}
      />
    );
  } else {
    return (
      <AppLoginTemplate
        onLogin={() => window.electron.shell.openExternal(links.web.login())}
      />
    );
  }
};

export default LoginPage;
