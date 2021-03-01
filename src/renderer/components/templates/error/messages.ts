import { defineMessages } from 'react-intl';

const Messages = defineMessages({
  not_found: {
    defaultMessage: 'Page not found',
    id: 'templates.error.title-not_found',
    description: "Page couldn't be found",
  },
  server_error: {
    defaultMessage: 'Unexpected error',
    id: 'templates.error.title-unexpected_error',
    description:
      'There was an unexpected error when trying to perform an action',
  },
});

export default Messages;
