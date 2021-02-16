import 'twin.macro';
import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import LoginTemplate from '@/components/templates/login';
import { isBrowser } from '@/constants/platform';
import { OauthState } from '@/typings/gremio-steve';

const LoginPage = () => {
  const handleLogin = useCallback(() => {
    const url = new URL(CONFIG.renderer.auth.request_url);

    const state: OauthState = {
      identifier: uuidv4(),
      came_from: isBrowser ? 'browser' : 'app',
    };

    sessionStorage.setItem('oauthstate', JSON.stringify(state));
    url.searchParams.append('state', btoa(JSON.stringify(state)));

    if (isBrowser === true) {
      document.location.href = url.toString();
    } else {
      window.electron.shell.openExternal(url.toString());
    }
  }, []);

  return <LoginTemplate onLogin={handleLogin} />;
};

export default LoginPage;
