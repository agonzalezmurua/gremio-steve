import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import ErrorTemplate from '_/components/templates/error';

const Messages = defineMessages({
  not_found: {
    defaultMessage:
      'The page you are looking for couldn’t be found: <br/>Either it was moved or you need to ask that friend of yourto check the link before sending it....',
    id: 'pages.not_found.message',
    description: 'Webpage could not be found, description',
  },
});

const NoMatchPage: React.FunctionComponent = () => {
  return <ErrorTemplate title="not_found" message={Messages.not_found} />;
};

NoMatchPage.displayName = 'NoMatchPage';

export default NoMatchPage;
