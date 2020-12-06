import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatchPage: React.FunctionComponent = () => {
  const { pathname } = useLocation();
  return (
    <main>
      <h1>404 error</h1>
      <span>{pathname}</span>
    </main>
  );
};

NoMatchPage.displayName = 'NoMatchPage';

export default NoMatchPage;
