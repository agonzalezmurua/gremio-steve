/**
 * This file's function is to define messages that do not have or require
 * a context to make sense
 */

import { defineMessages } from 'react-intl';

const GenericMessages = defineMessages({
  'generic.loading': {
    id: 'generic.loading',
    defaultMessage: 'Loading...',
    description: 'Loading message',
  },
});

export default GenericMessages;
