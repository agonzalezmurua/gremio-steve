import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

const NoMatchPage: React.FunctionComponent = () => {
  const { pathname } = useLocation();
  return (
    <main>
      <FormattedMessage
        id="pages.notFound.titleHeader"
        defaultMessage="404 - Not found"
        description="Not found page header"
        tagName="h1"
      />
      <span>{pathname}</span>
    </main>
  );
};

NoMatchPage.displayName = 'NoMatchPage';

export default NoMatchPage;
