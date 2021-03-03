import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import ErrorTemplate from '_/components/templates/error';

const Messages = defineMessages({
  title: {
    defaultMessage: 'Page not found',
    id: 'templates.error.title-not_found',
    description: "Page couldn't be found",
  },
  message: {
    defaultMessage: `The page you are looking for couldn’t be found.`,
    id: 'pages.not_found.title',
    description: 'Webpage could not be found, description',
  },
});

const NoMatchPage: React.FunctionComponent = () => {
  return (
    <ErrorTemplate
      statusCode={404}
      title={Messages.title}
      message={Messages.message}
    />
  );
};

NoMatchPage.displayName = 'NoMatchPage';

export default NoMatchPage;
